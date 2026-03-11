import express from "express";
import cors from "cors";
import fs from "fs";
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
    // Robust path resolution for various deployment environments (Local, Docker, Nixpacks)
    const possiblePaths = [
        path.join(__dirname, "../../web/dist"),      // Local & Dockerfile (if run from backend/src)
        path.join(process.cwd(), "../web/dist"),     // Fallback if CWD is /app/backend
        path.join(process.cwd(), "web/dist"),        // Nixpacks / Railway default (if CWD is /app or /workspace)
        "/app/web/dist",                             // Hardcoded Dockerfile explicit path
        "/workspace/web/dist"                        // Hardcoded Nixpacks explicit path
    ];

    let frontendPath: string = path.join(__dirname, "../../web/dist"); // Default fallback
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            frontendPath = p;
            break;
        }
    }

    console.log("Serving frontend dynamically derived from: ", frontendPath);
    app.use(express.static(frontendPath));
    app.get(/.*/, (req, res, next) => {
        res.sendFile(path.join(frontendPath, "index.html"), (err) => {
            if (err) {
                console.error("Error serving index.html:", err);
                // Keep next(err) commented or handled to prevent exposing raw errors to frontend in deep SPA routes
                res.status(500).send("Frontend build not found.");
            }
        }); 
    });
}

//error handler in last
app.use(errorHandler)

export default app;

