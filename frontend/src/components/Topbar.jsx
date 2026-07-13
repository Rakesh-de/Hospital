import "./Topbar.css";
import {
  Bell,
  Search,
  Menu,
  Sun,
  Moon
} from "lucide-react";

const Topbar = ({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
  user
}) => {

  return (

    <header className="topbar">

      <div className="topbar-left">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={22} />
        </button>

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search reports, doctors, AI chat..."
          />

        </div>

      </div>

      <div className="topbar-right">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="notification-btn">

          <Bell size={20} />

          <span className="notification-count">
            3
          </span>

        </button>

        <div className="profile-box">

          <img
            src={
              user?.avatar ||
              "https://i.pravatar.cc/100"
            }
            alt="profile"
          />

          <div>

            <h4>
              {user?.name || "Rakesh"}
            </h4>

            <span>
              {user?.email || "rakesh@gmail.com"}
            </span>

          </div>

        </div>

      </div>

    </header>

  );

};

export default Topbar;