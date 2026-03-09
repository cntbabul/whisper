import app from "./src/app.ts"
import { connectDB } from "./src/config/database.ts";




//routes
// 1 test route
// app.use("/api/v1/test", require("./routes/testRoutes"));





//port
const PORT = process.env.PORT || 3000;

//listen
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(
            `✊ Node Server Running  In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`

        );
    });
})