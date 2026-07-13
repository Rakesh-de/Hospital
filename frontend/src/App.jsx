import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Register from "./pages/Register";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

import VerifyEmail from "./pages/VerifyEmail";

import Dashboard from "./pages/Dashboard";

import { BrowserRouter } from "react-router-dom";

import AIReport from "./pages/AIReport";

import About from "./pages/About";

import AIChat from "./pages/AIChat";

import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

import Report from "./pages/Report";

import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";

import Settings from "./pages/Settings";

import UploadReport from "./components/upload/UploadReport";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route
                path="/report/:id"
                element={
                    <ProtectedRoute>
                        <AIReport />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/about"
                element={<About />}
            />
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <AIChat />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/chat/:id"
                element={
                    <ProtectedRoute>
                        <AIChat />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <ProtectedRoute>
                        <Report />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/appointments"
                element={
                    <ProtectedRoute>
                        <Appointments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/upload-report"
                element={
                    <ProtectedRoute>
                        <UploadReport />
                    </ProtectedRoute>
                }
            />


            {/* <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            /> */}


            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>

                }

            />

        </Routes>

    );

}

export default App;