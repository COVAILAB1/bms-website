import mongoose from "mongoose";

const dashboardModel = mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
    default: 0,
  },
  humidity: {
    type: Number,
    required: true,
    default: 0,
  },
  voltage: {
    type: Number,
    required: true,
    default: 0,
  },
  batteryPercentage: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("DashBoard", dashboardModel);
