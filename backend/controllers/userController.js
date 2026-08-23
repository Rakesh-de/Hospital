import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Report from "../models/Report.js";



const changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });

    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deleteAccount = async (req, res) => {

  try {

    const userId = req.user._id;

    // Delete all reports of the user
    await Report.deleteMany({
      user: userId,
    });

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id)
      .select("-password");


    if (!user) {

      return res.status(404).json({
        success:false,
        message:"User not found"
      });

    }


    res.status(200).json({
      success:true,
      user
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

const updateProfile = async (req, res) => {

  try {

    const {
      name,
      phone,
      age,
      gender
    } = req.body;


    const user = await User.findById(req.user._id);


    if (!user) {

      return res.status(404).json({
        success:false,
        message:"User not found"
      });

    }


    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.age = age || user.age;
    user.gender = gender || user.gender;


    await user.save();


    res.status(200).json({
      success:true,
      message:"Profile updated successfully",
      user
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
export {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
};