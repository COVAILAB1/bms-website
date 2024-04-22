import express from "express";
import { createBMS } from "../controllers/dashboardController.js";

const router = express.Router();

router.route("/create-bms-data").post(createBMS);

export default router;
