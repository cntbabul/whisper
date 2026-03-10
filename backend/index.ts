import app from "./src/app.ts"
import { connectDB } from "./src/config/database.ts";
import { createServer } from "http";
import { initializeSocket } from "./src/utils/socket.ts";

//port
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
initializeSocket(httpServer)

//listen
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(
            `✊ Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`
        );
    });
}).catch((err) => {
    console.log("Database connection failed", err);
    process.exit(1);
})