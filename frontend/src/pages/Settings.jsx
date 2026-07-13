import "./Settings.css";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
    Bell,
    Lock,
    Moon,
    Globe,
    Shield,
    Trash2,
} from "lucide-react";

const Settings = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [darkMode, setDarkMode] = useState(false);

    const [settings, setSettings] = useState({

        notifications: true,

        emailAlerts: true,

        darkTheme: false,

        language: "English",

    });

    const handleToggle = (field) => {

        setSettings({

            ...settings,

            [field]: !settings[field],

        });

    };

    const handleLanguage = (e) => {

        setSettings({

            ...settings,

            language: e.target.value,

        });

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

                        <p>

                            Manage your application preferences.

                        </p>

                    </div>

                    <div className="settings-container">

                        <div className="setting-card">

                            <h3>

                                <Bell size={20}/>

                                Notifications

                            </h3>

                            <label>

                                <span>Push Notifications</span>

                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={() =>
                                        handleToggle("notifications")
                                    }
                                />

                            </label>

                            <label>

                                <span>Email Alerts</span>

                                <input
                                    type="checkbox"
                                    checked={settings.emailAlerts}
                                    onChange={() =>
                                        handleToggle("emailAlerts")
                                    }
                                />

                            </label>

                        </div>

                        <div className="setting-card">

                            <h3>

                                <Moon size={20}/>

                                Appearance

                            </h3>

                            <label>

                                <span>Dark Mode</span>

                                <input
                                    type="checkbox"
                                    checked={settings.darkTheme}
                                    onChange={() =>
                                        handleToggle("darkTheme")
                                    }
                                />

                            </label>

                        </div>

                        <div className="setting-card">

                            <h3>

                                <Globe size={20}/>

                                Language

                            </h3>

                            <select
                                value={settings.language}
                                onChange={handleLanguage}
                            >

                                <option>English</option>

                                <option>Hindi</option>

                            </select>

                        </div>

                        <div className="setting-card">

                            <h3>

                                <Lock size={20}/>

                                Security

                            </h3>

                            <button className="setting-btn">

                                Change Password

                            </button>

                        </div>

                        <div className="setting-card danger">

                            <h3>

                                <Trash2 size={20}/>

                                Delete Account

                            </h3>

                            <button className="danger-btn">

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