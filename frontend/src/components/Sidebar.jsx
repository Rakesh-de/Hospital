import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";
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
  Upload,
  X,
} from "lucide-react";

import { useUI } from "../context/UIContext";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const navigate = useNavigate();

  const { sidebarOpen, setSidebarOpen } = useUI();

  const { logout } = useAuth();

  const isMobile = window.innerWidth <= 768;

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  const closeSidebar = () => {

    if (isMobile) {

      setSidebarOpen(false);

    }

  };

  return (
    <>
      {/* Overlay only Mobile */}

      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          isMobile
            ? sidebarOpen
              ? "show"
              : "hide"
            : ""
        }`}
      >
        {/* Logo */}

        <div className="sidebar-logo">

          <div className="logo-left">

            <HeartPulse size={30} />

            <div>

              <h2>MediMind</h2>

              <span>AI Healthcare</span>

            </div>

          </div>

          {/* X only Mobile */}

          {isMobile && (
            <button
              className="close-sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Menu */}

        <nav className="sidebar-menu">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/upload-report"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <Upload size={20} />
            <span>Upload Report</span>
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <MessageSquare size={20} />
            <span>AI Assistant</span>
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <FileText size={20} />
            <span>Reports</span>
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <CalendarDays size={20} />
            <span>Appointments</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={closeSidebar}
          >
            <Shield size={20} />
            <span>Admin</span>
          </NavLink>

        </nav>

        {/* Logout */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Logout
        </button>

      </aside>
    </>
  );
};

export default Sidebar;