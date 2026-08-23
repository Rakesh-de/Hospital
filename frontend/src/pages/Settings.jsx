import "./Settings.css";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { Lock, Trash2 } from "lucide-react";

import {
  changePassword,
  deleteAccount,
} from "../services/userService";

const Settings = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [passwords, setPasswords] = useState({

    currentPassword: "",

    newPassword: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setPasswords({

      ...passwords,

      [e.target.name]: e.target.value,

    });

  };

  const handlePassword = async () => {

    if (passwords.newPassword !== passwords.confirmPassword) {

      return alert("Passwords do not match");

    }

    try {

      const data = await changePassword(passwords);

      alert(data.message);

      setPasswords({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

      });

    } catch (error) {

      alert(error.response?.data?.message || "Password change failed");

    }

  };

  const handleDelete = async () => {

    const ok = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!ok) return;

    try {

      const data = await deleteAccount();

      alert(data.message);

      localStorage.removeItem("token");

      window.location.href = "/login";

    } catch (error) {

      alert(error.response?.data?.message || "Delete failed");

    }

  };

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={{
            name: "Rakesh",
            email: "rakesh@gmail.com",
          }}
        />

        <div className="settings-page">

          <div className="settings-header">

            <h1>Settings</h1>

            <p>Manage your account.</p>

          </div>

          <div className="settings-container">

            <div className="setting-card">

              <h3>

                <Lock size={20} />

                Change Password

              </h3>

              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwords.currentPassword}
                onChange={handleChange}
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleChange}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />

              <button
                className="setting-btn"
                onClick={handlePassword}
              >
                Update Password
              </button>

            </div>

            <div className="setting-card danger">

              <h3>

                <Trash2 size={20} />

                Delete Account

              </h3>

              <p>
                This action cannot be undone.
              </p>

              <button
                className="danger-btn"
                onClick={handleDelete}
              >
                Delete My Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Settings;