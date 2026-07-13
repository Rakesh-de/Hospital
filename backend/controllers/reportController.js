import Report from "../models/Report.js";
import {
  uploadToCloudinary,
} from "../config/cloudinary.js";

import { deleteFromCloudinary } from "../config/cloudinary.js";

/*
=========================================
Upload Medical Report
POST /api/reports/upload
Private
=========================================
*/

export const uploadReport = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "Please upload a file.",

      });

    }

    const file = req.file;

    const resourceType =
      file.mimetype === "application/pdf"
        ? "raw"
        : "image";

    const uploadedFile =
      await uploadToCloudinary(
        file.buffer,
        "medimind/reports",
        resourceType
      );

    const report = await Report.create({

      user: req.user._id,

      fileName: file.originalname,

      fileUrl: uploadedFile.secure_url,

      publicId: uploadedFile.public_id,

      fileType:
        file.mimetype === "application/pdf"
          ? "pdf"
          : "image",

      fileSize: file.size,

      uploadStatus: "Uploaded",

      analysisStatus: "Pending",

    });

    res.status(201).json({

      success: true,

      message: "Report uploaded successfully.",

      report,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/*
=========================================
Get All Reports
GET /api/reports
Private
=========================================
*/

export const getReports = async (req, res) => {

  try {

    const reports = await Report.find({

      user: req.user._id,

      isDeleted: false,

    }).sort({

      createdAt: -1,

    });

    res.json({

      success: true,

      count: reports.length,

      reports,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

/*
=========================================
Get Single Report
GET /api/reports/:id
Private
=========================================
*/

export const getReport = async (req, res) => {

  try {

    const report = await Report.findOne({

      _id: req.params.id,

      user: req.user._id,

      isDeleted: false,

    });

    if (!report) {

      return res.status(404).json({

        success: false,

        message: "Report not found.",

      });

    }

    res.json({

      success: true,

      report,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const deleteReport = async (req, res) => {
  try {

    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    // Delete from Cloudinary

    await deleteFromCloudinary(report.publicId);

    // Soft Delete

    report.isDeleted = true;

    await report.save();

    res.json({
      success: true,
      message: "Report deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================
Download Report
GET /api/reports/:id/download
Private
=========================================
*/

export const downloadReport = async (req, res) => {

  try {

    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!report) {

      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });

    }

    res.json({
      success: true,
      downloadUrl: report.fileUrl,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================
Analyze Report (Temporary)
POST /api/reports/:id/analyze
Private
=========================================
*/

export const analyzeReport = async (req, res) => {

    try {

        const report = await Report.findOne({
            _id: req.params.id,
            user: req.user._id,
            isDeleted: false,
        });

        if (!report) {

            return res.status(404).json({
                success: false,
                message: "Report not found."
            });

        }

        report.analysisStatus = "Processing";
        await report.save();

        // AI Backend Call

        const { data } = await aiApi.post(
            "/report/analyze",
            {
                reportId: report._id,
                fileUrl: report.fileUrl,
                fileType: report.fileType
            }
        );

        report.analysisStatus = "Completed";
        report.extractedText = data.extractedText;
        report.aiSummary = data.summary;
        report.diagnosis = data.diagnosis;
        report.recommendations = data.recommendations;
        report.confidenceScore = data.confidenceScore;
        report.riskLevel = data.riskLevel;

        await report.save();

        res.json({
            success: true,
            report
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ===============================
// Dashboard Statistics
// ===============================

export const getDashboardStats = async (req, res) => {

  try {

    const userId = req.user._id;

    const totalReports = await Report.countDocuments({
      user: userId,
      isDeleted: false,
    });

    const analyzedReports = await Report.countDocuments({
      user: userId,
      analysisStatus: "Completed",
      isDeleted: false,
    });

    const pendingReports = await Report.countDocuments({
      user: userId,
      analysisStatus: "Pending",
      isDeleted: false,
    });

    const criticalReports = await Report.countDocuments({
      user: userId,
      riskLevel: "High",
      isDeleted: false,
    });

    const recentReports = await Report.find({
      user: userId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const analyzedPercentage =
      totalReports === 0
        ? 0
        : ((analyzedReports / totalReports) * 100).toFixed(1);

    const pendingPercentage =
      totalReports === 0
        ? 0
        : ((pendingReports / totalReports) * 100).toFixed(1);

    const criticalPercentage =
      totalReports === 0
        ? 0
        : ((criticalReports / totalReports) * 100).toFixed(1);

    const healthScore = Math.max(
      100 - criticalReports * 15 - pendingReports * 5,
      0
    );

    const riskLevel =
      healthScore >= 85
        ? "Low"
        : healthScore >= 60
        ? "Medium"
        : "High";

    const lastAnalysis =
      recentReports.length > 0
        ? recentReports[0].createdAt
        : null;

    // Activities
    const activities = recentReports.map((report) => ({
      title: report.fileName,
      description: `${report.fileType.toUpperCase()} uploaded successfully`,
      time: report.createdAt,
      status: report.analysisStatus,
    }));

    res.status(200).json({

      success: true,

      stats: {

        totalReports,
        analyzedReports,
        pendingReports,
        criticalReports,

        totalPercentage: 100,

        analyzedPercentage,
        pendingPercentage,
        criticalPercentage,

        healthScore,
        riskLevel,
        lastAnalysis,

      },

      recentReports,

      activities,

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};