import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import dashboardRouter from "./routers/dashboardRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); 
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("server is listening to PORT:", process.env.PORT);
});

app.use("/api", dashboardRouter);
app.use(errorHandler)
