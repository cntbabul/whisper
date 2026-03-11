import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { clerkMiddleware } from "@clerk/express";
import path from "path";

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

///serve front end under backend
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../../web/dist");
    console.log("Serving frontend from: ", frontendPath);
    app.use(express.static(frontendPath));
    app.get(/.*/, (req, res, next) => {
        res.sendFile(path.join(frontendPath, "index.html"), (err) => {
            if (err) {
                console.error("Error serving index.html:", err);
                next(err);
            }
        }); 
    });
}

//error handler in last
app.use(errorHandler)

export default app;

