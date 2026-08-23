import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {   
    // Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // File Information
    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "image"],
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

  
    // Upload / Analysis Status
    

    uploadStatus: {
      type: String,
      enum: ["Uploading", "Uploaded", "Failed"],
      default: "Uploaded",
    },

    analysisStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Completed",
        "Failed",
      ],
      default: "Pending",
    },

    // ==========================
    // OCR
    // ==========================

    extractedText: {
      type: String,
      default: "",
    },

    // ==========================
    // AI Summary
    // ==========================

    aiSummary: {
      type: String,
      default: "",
    },

    medicalContext: {
      type: String,
      default: "",
    },

    doctorNotes: {
      type: String,
      default: "",
    },

    // ==========================
    // Scores
    // ==========================

    confidenceScore: {
      type: Number,
      default: 0,
    },

    healthScore: {
      type: Number,
      default: 0,
    },

    overallHealth: {
      type: String,
      default: "",
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },

    // ==========================
    // AI Objects
    // ==========================

    vision: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    clinical: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    diagnosis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    recommendation: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    labValues: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    labAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    prescription: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    drugInteractions: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    comparison: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    emergency: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // ==========================
    // Arrays
    // ==========================

    medicines: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    medicineSchedule: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    possibleConditions: {
      type: [String],
      default: [],
    },

    followUpTests: {
      type: [String],
      default: [],
    },

    abnormalValues: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    // ==========================
    // Review
    // ==========================

    doctorReviewed: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
      default: [],
    },

    // ==========================
    // Soft Delete
    // ==========================

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);