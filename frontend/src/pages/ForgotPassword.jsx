import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, HeartPulse } from "lucide-react";
import toast from "react-hot-toast";

import "./ForgotPassword.css";
import api from "../services/api";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {

    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {

      setLoading(true);

      const { data } = await api.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(data.message);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="forgot-page">

      {/* Left */}

      <motion.div
        className="forgot-left"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >

        <div className="brand">

          <HeartPulse size={45} />

          <h1>MediMind AI</h1>

        </div>

        <h2>Password Recovery</h2>

        <p>

          Forgot your password? No worries.
          Enter your registered email address and
          we'll send you a secure password reset link.

        </p>

      </motion.div>

      {/* Right */}

      <motion.div
        className="forgot-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >

        <form
          className="forgot-card"
          onSubmit={submitHandler}
        >

          <h2>Forgot Password</h2>

          <p>
            Enter your registered email
          </p>

          <div className="input-group">

            <Mail size={20} />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="forgot-btn"
            disabled={loading}
          >

            {loading
              ? "Sending..."
              : "Send Reset Link"}

          </button>

          <p className="back-login">

            Remember your password?

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </motion.div>

    </div>

  );

};

export default ForgotPassword;