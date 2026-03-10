import app from "./src/app.ts"
import { connectDB } from "./src/config/database.ts";

import { clerkMiddleware } from '@clerk/express'


//middleware
app.use(clerkMiddleware());

//port
const PORT = process.env.PORT || 3000;

//listen
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(
            `✊ Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`
        );
    });
}).catch((err) => {
    console.log("Database connection failed", err);
    process.exit(1);
})