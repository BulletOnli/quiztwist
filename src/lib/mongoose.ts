import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB;
