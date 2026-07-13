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

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/*
=========================================
Upload Report
POST /api/reports/upload
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
Get All Reports
GET /api/reports
=========================================
*/

router.get(
  "/",
  protect,
  getReports
);

/*
=========================================
Get Single Report
GET /api/reports/:id
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
DELETE /api/reports/:id
=========================================
*/

router.delete(
  "/:id",
  protect,
  deleteReport
);

/*
=========================================
Download Report
GET /api/reports/:id/download
=========================================
*/

router.get(
  "/:id/download",
  protect,
  downloadReport
);

router.post(
    "/:id/analyze",
    protect,
    analyzeReport
);
/*
=========================================
Analyze Report
POST /api/reports/:id/analyze
=========================================
*/

router.get(
    "/dashboard",
    protect,
    getDashboardStats
);

router.post(
  "/:id/analyze",
  protect,
  analyzeReport
);

export default router;