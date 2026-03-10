import { Socket, Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "@clerk/express";
import { Message } from "../models/Message.model";
import { Chat } from "../models/Chat.model";
import { User } from "../models/User.model"


//store online users in memory userId,socketId
export const onlineUsers: Map<string, string> = new Map();

export const initializeSocket = (httpServer: HttpServer) => {
    const allowedOrigins: string[] = [
        "*",
        process.env.FRONTEND_URL || ""
    ].filter((url) => url !== "");

    const io = new SocketServer(httpServer, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error"))
        }

        try {
            const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! });
            const clerkId = session.sub

            const user = await User.findOne({ clerkId });
            if (!user) {
                return next(new Error("User not found"))
            }

            socket.data.userId = user._id.toString();
            next();
        } catch (error: any) {
            next(new Error(error))
        }

    });

    io.on("connection", (socket) => {
        const userId = socket.data.userId;

        if (!userId) {
            console.log("No userId found(socket.ts)")
            return;
        }
        //send list of currently online users to the newly connected client
        socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) });

        //store user in the onlineUsers map
        onlineUsers.set(userId, socket.id);

        //notify others that this current user is online
        socket.broadcast.emit("user-online", { userId });

        socket.join(`user:${userId}`);
        socket.on("join-chat", (chatId: string) => { socket.join(`chat:${chatId}`) })

        socket.on("leave-chat", (chatId: string) => {
            socket.leave(`chat:${chatId}`)
        })
        //handle sending mesage 
        socket.on("seng-message", async (data: { chatId: string, text: string }) => {
            try {
                const { chatId, text } = data;
                const chat = await Chat.findOne({ _id: chatId, participants: userId })
                if (!chat) {
                    socket.emit("socket-error", { message: "Chat not found." })
                    return;
                }
                const message = await Message.create({
                    chat: chatId,
                    sender: userId,
                    text
                })
                chat.lastMessage = message._id;
                chat.lastMessageAt = new Date()
                await chat.save();

                await message.populate("sender", "name avatar");
                //emit to chat room (for users inside the chat)
                io.to(`chat:${chatId}`).emit("new-message", message);

                //also emit to participants personal rooms (for chat list view)
                //todo:study socket.io
                for (const participantId of chat.participants) {
                    io.to(`user:${participantId}`).emit("new-message", message);
                }
            } catch (error) {
                console.log("Error in send-message:", error);
                socket.emit("socket-error", { message: "Failed to send message" })
            }
        })

        socket.on("typing", async (data: any) => { })
        socket.on("disconnet", () => {
            onlineUsers.delete(userId);
            socket.broadcast.emit("user-offline", { userId });
            console.log("User disconnected:", userId);
        })


    });

    return io;
};
