import mongoose from "mongoose";




const connectDB=async()=>{
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not configured. Add it to server/.env.")
    }

    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB Connected")
}

export default connectDB