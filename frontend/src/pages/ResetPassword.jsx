import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, HeartPulse } from "lucide-react";
import toast from "react-hot-toast";

import "./ResetPassword.css";
import api from "../services/api";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { password, confirmPassword } = formData;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {

      setLoading(true);

      const { data } = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Reset Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="reset-page">

      <motion.div
        className="reset-left"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >

        <div className="brand">

          <HeartPulse size={45} />

          <h1>MediMind AI</h1>

        </div>

        <h2>Create New Password</h2>

        <p>

          Your new password should be
          secure and easy for you to remember.

        </p>

      </motion.div>

      <motion.div
        className="reset-right"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >

        <form
          className="reset-card"
          onSubmit={submitHandler}
        >

          <h2>Reset Password</h2>

          <p>Create a new password</p>

          <div className="input-group">

            <Lock size={20} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              name="password"
              value={password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>

          </div>

          <div className="input-group">

            <Lock size={20} />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>

          </div>

          <button
            className="reset-btn"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

          <p className="back-login">

            <Link to="/login">
              Back to Login
            </Link>

          </p>

        </form>

      </motion.div>

    </div>

  );

};

export default ResetPassword;