import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { askMedicalAI } from "../controllers/chatController.js";

const router = express.Router();

router.post("/:reportId", protect, askMedicalAI);

export default router;