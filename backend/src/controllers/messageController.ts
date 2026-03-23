import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/Chat.model";
import { Message } from "../models/Message.model";

/**
 * Retrieve messages for a chat the authenticated user participates in.
 *
 * Responds with the chat's messages populated with each sender's `name`, `email`, and `avatar`, sorted by `createdAt` ascending. Sends a 404 response if the chat does not exist or the user is not a participant. On unexpected errors sets the response status to 500 and forwards the error to `next`.
 *
 * @param req - Authenticated request; must include `userId` (the caller's user id) and `params.chatId` (the target chat id)
 */
export async function getMessages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const { chatId } = req.params;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        })
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" })
        }

        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name email avatar")
            .sort({ createdAt: 1 })

        res.json(messages)

    } catch (error) {
        res.status(500)
        next(error)
    }
}