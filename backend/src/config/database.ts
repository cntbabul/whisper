import mongoose from "mongoose"

export const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        throw new Error("Please provide MONGODB_URI in the environment variables");
    }
    try {
        await mongoose.connect(mongoURI);
        console.log(
            `✅ Connected To Mongodb Database ${mongoose.connection.host}`
        );
    } catch (error) {
        console.log(`❌ Mongodb Database Error  ${error}`);
        process.exit(1);
    }
};
