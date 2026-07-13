import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  CalendarDays,
  User,
  Settings,
  Shield,
  LogOut,
  HeartPulse,
} from "lucide-react";
import {
  Upload
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <HeartPulse size={32} />

        <div>
          <h2>MediMind</h2>
          <span>AI Healthcare</span>
        </div>

      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/upload-report"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <Upload size={20} />
          <span>Upload Report</span>
        </NavLink>
        
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <MessageSquare size={20} />
          <span>AI Assistant</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FileText size={20} />
          <span>Medical Reports</span>
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <CalendarDays size={20} />
          <span>Appointments</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <Shield size={20} />
          <span>Admin</span>
        </NavLink>

      </nav>

      <button className="logout-btn">
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;