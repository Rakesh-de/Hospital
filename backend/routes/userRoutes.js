import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/userController.js";

const router = express.Router();

/* ===========================
   Profile
=========================== */

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

/* ===========================
   Change Password
=========================== */

router.put(
  "/change-password",
  protect,
  changePassword
);

/* ===========================
   Delete Account
=========================== */

router.delete(
  "/delete-account",
  protect,
  deleteAccount
);

export default router;