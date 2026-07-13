import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";


import sendEmail from "../utils/sendEmail.js";
// Register User
export const register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });

    console.log("User created successfully:", user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("=== REGISTER ERROR ===");
    console.error(error);
    console.error("=======================");

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. VERIFY EMAIL (Yaha daal diya)
// ==========================================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid verification link" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;

        await user.save();

        const resetURL =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await sendEmail(

            user.email,

            "Reset Password",

            `
            <h2>MediMind AI</h2>

            <p>Click below to reset password.</p>

            <a href="${resetURL}">
                Reset Password
            </a>
            `

        );

        res.status(200).json({

            success: true,

            message: "Password reset email sent."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpires: { $gt: Date.now() }

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Token expired or invalid"

            });

        }

        user.password = password;

        user.resetPasswordToken = undefined;

        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Updated Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};