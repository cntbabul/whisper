import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { clerkMiddleware } from "@clerk/express";

const PORT = process.env.PORT || 3000



//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
//clerk middleware
app.use(clerkMiddleware());


app.get("/health", (req, res) => {
    res.send("health OK")
})
//custom route
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/chats", chatRoutes)
app.use("/api/v1/messages", messageRoutes)
app.use("/api/v1/users", userRoutes)

//error handler in last
app.use(errorHandler)



export default app;

