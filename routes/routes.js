import express from "express";
import {
  backendCheck,
  fetchRecent,
  getPaginatedDatetimes,
  saveDatetime,
  sseHandler,
} from "../controller/controller.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", backendCheck);
router.get("/getdatetime", saveDatetime);


router.get("/sse", sseHandler); // SSE endpoint

router.get("/getRecent", fetchRecent);
router.get("/datetimes", getPaginatedDatetimes);



const DataSchema = new mongoose.Schema({
  value: Number,
});
const DataModel = mongoose.model("Data", DataSchema);

// API to save value (0 or 1)
router.post("/save", async (req, res) => {
  await DataModel.deleteMany(); // Keep only latest value
  const newData = new DataModel({ value: req.body.value });
  await newData.save();
  res.json({ success: true });
});

// API to fetch saved value
router.get("/fetch", async (req, res) => {
  const data = await DataModel.findOne();
  res.json({ value: data ? data.value : 0 });
});
export default router;
