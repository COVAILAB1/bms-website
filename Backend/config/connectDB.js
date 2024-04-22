import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      "mongodb://127.0.0.1:27017/bms-db"
    );
    console.log("MongoDB Connection successfull", connectDB.connection.name);
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
