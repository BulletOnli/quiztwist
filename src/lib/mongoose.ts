import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
    } catch (error) {
        console.log("ErrorDB", error);
    }
};

export default connectToDB;
