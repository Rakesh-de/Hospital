import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, HeartPulse } from "lucide-react";
import toast from "react-hot-toast";

import "./Login.css";

// import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser(formData);

            login(response.user, response.token);

            toast.success("Login Successful");

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* Left Side */}

            <motion.div
                className="login-left"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >

                <div className="brand">

                    <HeartPulse size={45} />

                    <h1>MediMind AI</h1>

                </div>

                <h2>
                    AI Powered Healthcare Platform
                </h2>

                <p>
                    Securely upload medical reports, chat with AI,
                    receive intelligent health insights and manage
                    appointments from one dashboard.
                </p>

                <div className="feature-list">

                    <div className="feature-item">
                        ✓ AI Medical Report Analysis
                    </div>

                    <div className="feature-item">
                        ✓ Multi-Agent Diagnosis
                    </div>

                    <div className="feature-item">
                        ✓ Secure Cloud Storage
                    </div>

                    <div className="feature-item">
                        ✓ Doctor Consultation
                    </div>

                </div>

            </motion.div>

            {/* Right Side */}

            <motion.div
                className="login-right"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >

                <form
                    className="login-card"
                    onSubmit={submitHandler}
                >

                    <h2>Welcome Back 👋</h2>

                    <p>
                        Login to continue using MediMind AI
                    </p>

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
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>

                    <div className="login-options">

                        <label className="remember-me">

                            <input type="checkbox" />

                            Remember Me

                        </label>

                        <Link
                            to="/forgot-password"
                            className="forgot-link"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
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

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </p>

                </form>

            </motion.div>

        </div>

    );

};

export default Login;