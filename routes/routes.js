import express from "express";
import {
  backendCheck,
  fetchRecent,
  getPaginatedDatetimes,
  saveDatetime,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", backendCheck);
router.get("/getdatetime", saveDatetime);

router.get("/getRecent", fetchRecent);
router.get("/datetimes", getPaginatedDatetimes);

export default router;
