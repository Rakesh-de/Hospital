import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAdminDashboard } from "../controllers/adminController.js";

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", protect, getAdminDashboard);

export default router;