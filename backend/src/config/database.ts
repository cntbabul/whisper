import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log(
            `✅ Connected To Mongodb Database ${mongoose.connection.host}`
        );
    } catch (error) {
        console.log(`❌ Mongodb Database Error  ${error}`);
        process.exit(1);
    }
};
