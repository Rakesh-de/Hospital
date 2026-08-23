import "./Topbar.css";

import {

  Bell,
  Search,
  Menu,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,

} from "lucide-react";

import { useUI } from "../context/UIContext";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import NotificationPanel from "./NotificationPanel";



const Topbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();



  const {

    sidebarOpen,
    setSidebarOpen,

    darkMode,
    setDarkMode,

    search,
    setSearch,

    notifications,
    notificationOpen,
    setNotificationOpen,

    unreadCount,
    markAllRead,

  } = useUI();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <header className="topbar">

      {/* LEFT */}

      <div className="topbar-left">
       {(window.innerWidth <= 768 || !sidebarOpen) && (
        <button

          className="menu-btn"

          onClick={() => setSidebarOpen(true)}

        >

          <Menu size={22} />

        </button>
       )
       }
        <div className="search-box">

          <Search size={18} />

          <input

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            placeholder="Search reports, AI Chat..."

          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="topbar-right">

        {/* Theme */}

        <button

          className="theme-btn"

          onClick={() =>

            setDarkMode(!darkMode)

          }

        >

          {

            darkMode

              ?

              <Sun size={20} />

              :

              <Moon size={20} />

          }

        </button>

        {/* Notification */}

        <div className="notification-wrapper">

          <button

            className="notification-btn"

            onClick={() =>

              setNotificationOpen(

                !notificationOpen

              )

            }

          >

            <Bell size={20} />

            {

              unreadCount > 0 && (

                <span className="notification-count">

                  {unreadCount}

                </span>

              )

            }

          </button>

          {

            notificationOpen && (

              <div className="notification-dropdown">

                <div className="notification-header">

                  <h4>

                    Notifications

                  </h4>

                  <button

                    onClick={markAllRead}

                  >

                    Mark all

                  </button>

                </div>

                {

                  notifications.length === 0

                    ?

                    <p>

                      No Notifications

                    </p>

                    :

                    notifications.map(item => (

                      <div

                        key={item._id}

                        className={`notification-item ${item.read

                          ?

                          ""

                          :

                          "unread"

                          }`}

                      >

                        <strong>

                          {item.title}

                        </strong>

                        <p>

                          {item.message}

                        </p>

                      </div>

                    ))

                }

              </div>

            )

          }

        </div>

        {/* Profile */}

        <div className="profile-wrapper">

          <div

            className="profile-box"

            onClick={() =>

              setProfileOpen(

                !profileOpen

              )

            }

          >

            <img

              src={

                user?.avatar ||

                "https://i.pravatar.cc/150"

              }

              alt=""

            />

            <div>

              <h4>

                {user?.name}

              </h4>

              <span>

                {user?.email}

              </span>

            </div>

          </div>

          {

            profileOpen && (

              <div className="profile-dropdown">

                <button

                  onClick={() =>

                    navigate("/profile")

                  }

                >

                  <User size={16} />

                  Profile

                </button>

                <button

                  onClick={() =>

                    navigate("/settings")

                  }

                >

                  <Settings size={16} />

                  Settings

                </button>

                <button

                  onClick={handleLogout}

                >

                  <LogOut size={16} />

                  Logout

                </button>

              </div>

            )

          }

        </div>

      </div>

    </header>

  );

};

export default Topbar;