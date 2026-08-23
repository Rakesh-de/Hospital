import User from "../models/User.js";
import Report from "../models/Report.js";

export const getAdminDashboard = async (req, res) => {
  try {

    // ===========================
    // Dashboard Statistics
    // ===========================

    const totalUsers = await User.countDocuments();

    const totalReports = await Report.countDocuments({
      isDeleted: false,
    });

    const analyzedReports = await Report.countDocuments({
      analysisStatus: "Completed",
      isDeleted: false,
    });

    const pendingReports = await Report.countDocuments({
      analysisStatus: "Pending",
      isDeleted: false,
    });

    // ===========================
    // Recent Users
    // ===========================

    const recentUsers = await User.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // ===========================
    // Recent Reports
    // ===========================

    const recentReports = await Report.find({
      isDeleted: false,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // ===========================
    // Response
    // ===========================

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalReports,
        analyzedReports,
        pendingReports,
      },

      recentUsers,

      recentReports,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

