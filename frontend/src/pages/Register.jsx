import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  HeartPulse,
} from "lucide-react";
import toast from "react-hot-toast";

import "./Register.css";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const {
    name,
    email,
    password,
    confirmPassword,
  } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Token aur user info save karo taaki ProtectedRoute isko pehchan sake
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Left Section */}

      <motion.div
        className="register-left"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >

        <div className="brand">

          <HeartPulse size={45} />

          <h1>MediMind AI</h1>

        </div>

        <h2>Create Your Healthcare Account</h2>

        <p>
          Join our AI-powered healthcare platform and
          securely manage your reports, appointments,
          and health insights.
        </p>

        <div className="feature-list">

          <div className="feature-item">
            ✓ AI Medical Analysis
          </div>

          <div className="feature-item">
            ✓ Secure Medical Records
          </div>

          <div className="feature-item">
            ✓ Doctor Consultation
          </div>

          <div className="feature-item">
            ✓ Health Dashboard
          </div>

        </div>

      </motion.div>

      {/* Right Section */}

      <motion.div
        className="register-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >

        <form
          className="register-card"
          onSubmit={submitHandler}
        >

          <h2>Create Account</h2>

          <p>
            Register to start using MediMind AI
          </p>

          <div className="input-group">

            <User size={20} />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
            />

          </div>
          <div className="input-group">

            <Mail size={20} />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <Lock size={20} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <div className="input-group">

            <Lock size={20} />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <div className="divider">

            <span>OR</span>

          </div>

          <button
            type="button"
            className="google-btn"
          >
            Continue with Google
          </button>

          <p className="login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </motion.div>

    </div>

  );

};

export default Register;