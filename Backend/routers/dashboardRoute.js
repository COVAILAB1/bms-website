import express from "express";
import { createBMS, getData } from "../controllers/dashboardController.js";

const router = express.Router();

router.route("/create-bms-data").post(createBMS);
router.route("/getdata").get(getData);

export default router;
