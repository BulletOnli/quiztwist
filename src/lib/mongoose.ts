import environments from "../../environments/environments";
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(environments.MONGO_URI!);
  } catch (error) {
    console.log("ErrorDB", error);
  }
};

export default connectToDB;
