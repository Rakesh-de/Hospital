import express from "express";

import {
  uploadReport,
  getReports,
  getReport,
  deleteReport,
  downloadReport,
  analyzeReport,
  getDashboardStats,
} from "../controllers/reportController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/*
=========================================
Upload Report
=========================================
*/
router.post(
  "/upload",
  protect,
  upload.single("report"),
  uploadReport
);

/*
=========================================
Dashboard
=========================================
*/
router.get(
  "/dashboard",
  protect,
  getDashboardStats
);

/*
=========================================
Get All Reports
=========================================
*/
router.get(
  "/",
  protect,
  getReports
);

/*
=========================================
Download Report
=========================================
*/
router.get(
  "/:id/download",
  protect,
  downloadReport
);

/*
=========================================
Analyze Report
=========================================
*/
router.post(
  "/:id/analyze",
  protect,
  analyzeReport
);

/*
=========================================
Get Single Report
=========================================
*/
router.get(
  "/:id",
  protect,
  getReport
);

/*
=========================================
Delete Report
=========================================
*/
router.delete(
  "/:id",
  protect,
  deleteReport
);

export default router;