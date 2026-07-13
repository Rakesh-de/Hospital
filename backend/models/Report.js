import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    // Report Owner

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Original File Name

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary URL

    fileUrl: {
      type: String,
      required: true,
    },

    // Cloudinary Public Id

    publicId: {
      type: String,
      required: true,
    },

    // PDF / Image

    fileType: {
      type: String,
      enum: [
        "pdf",
        "image",
      ],
      required: true,
    },

    // Size

    fileSize: {
      type: Number,
      required: true,
    },

    // Upload Status

    uploadStatus: {
      type: String,
      enum: [
        "Uploading",
        "Uploaded",
        "Failed",
      ],
      default: "Uploaded",
    },

    // AI Status

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

    // AI Output

    aiSummary: {
      type: String,
      default: "",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    recommendations: [
      {
        type: String,
      },
    ],

    extractedText: {
      type: String,
      default: "",
    },

    confidenceScore: {
      type: Number,
      default: 0,
    },

    riskLevel: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
      ],
      default: "Low",
    },

    doctorReviewed: {
      type: Boolean,
      default: false,
    },

    tags: [
      {
        type: String,
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Report",
  reportSchema
);