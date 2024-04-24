import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection successfull", connectDB.connection.name);
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
