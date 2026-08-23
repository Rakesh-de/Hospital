import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useAuth } from "./AuthContext";

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const { user } = useAuth();

    // =========================
    // Sidebar
    // =========================

    const [sidebarOpen, setSidebarOpen] = useState(() => {

        const saved = localStorage.getItem("sidebarOpen");

        if (saved !== null) {

            return JSON.parse(saved);

        }

        // First time opening app
        if (window.innerWidth <= 768) {

            return false;   // Mobile -> Sidebar closed

        }

        return true;        // Desktop -> Sidebar open

    });

    // =========================
    // Dark Mode
    // =========================

    const [darkMode, setDarkMode] = useState(() => {

        return JSON.parse(
            localStorage.getItem("darkMode")
        ) ?? false;

    });

    // =========================
    // Search
    // =========================

    const [search, setSearch] = useState("");

    const clearSearch = () => {

        setSearch("");

    };

    // =========================
    // Notifications
    // =========================

    const [notifications, setNotifications] = useState(() => {

        const saved = localStorage.getItem("notifications");

        return saved
            ? JSON.parse(saved)
            : [];

    });

    const [notificationOpen, setNotificationOpen] = useState(false);

    const [loadingNotifications, setLoadingNotifications] = useState(false);

    // =========================
    // Theme Save
    // =========================

    useEffect(() => {

        document.body.classList.toggle(
            "dark",
            darkMode
        );

        localStorage.setItem(
            "darkMode",
            JSON.stringify(darkMode)
        );

    }, [darkMode]);

    // =========================
    // Sidebar Save
    // =========================

    useEffect(() => {

        localStorage.setItem(
            "sidebarOpen",
            JSON.stringify(sidebarOpen)
        );

    }, [sidebarOpen]);

    // =========================
    // Notification Save
    // =========================

    useEffect(() => {

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

    }, [notifications]);

    // =========================
    // Load Notifications
    // =========================

    useEffect(() => {

        if (

            user &&

            notifications.length === 0

        ) {

            fetchNotifications();

        }

    }, [user]);

    // =========================
    // Fetch Notification
    // =========================

    const fetchNotifications = async () => {

        try {

            setLoadingNotifications(true);

            /*
            Backend Ready

            const {data}=await api.get("/notifications");

            setNotifications(data.notifications);

            */

            const dummy = [

                {
                    _id: 1,
                    title: "Blood Report Uploaded",
                    message: "Your CBC report uploaded successfully.",
                    read: false,
                    createdAt: new Date(),
                },

                {
                    _id: 2,
                    title: "Appointment Tomorrow",
                    message: "Appointment with Dr. Sharma at 10:00 AM.",
                    read: false,
                    createdAt: new Date(),
                },

                {
                    _id: 3,
                    title: "AI Analysis Completed",
                    message: "AI analyzed your MRI report.",
                    read: true,
                    createdAt: new Date(),
                },

            ];

            setNotifications(dummy);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoadingNotifications(false);

        }

    };

    // =========================
    // Notification Count
    // =========================

    const unreadCount = notifications.filter(

        item => !item.read

    ).length;

    // =========================
    // Mark One Read
    // =========================

    const markRead = (id) => {

        setNotifications(

            prev =>

                prev.map(item =>

                    item._id === id

                        ?

                        {

                            ...item,

                            read: true,

                        }

                        :

                        item

                )

        );

    };

    // =========================
    // Mark All Read
    // =========================

    const markAllRead = () => {

        setNotifications(

            prev =>

                prev.map(item => ({

                    ...item,

                    read: true,

                }))

        );

    };

    // =========================
    // Add Notification
    // =========================

    const addNotification = (notification) => {

        setNotifications(

            prev => [

                notification,

                ...prev,

            ]

        );

    };

    // =========================
    // Delete Notification
    // =========================

    const deleteNotification = (id) => {

        setNotifications(

            prev =>

                prev.filter(

                    item => item._id !== id

                )

        );

    };

    // =========================

    return (

        <UIContext.Provider

            value={{

                sidebarOpen,
                setSidebarOpen,

                darkMode,
                setDarkMode,

                search,
                setSearch,
                clearSearch,

                notifications,
                setNotifications,

                notificationOpen,
                setNotificationOpen,

                unreadCount,

                loadingNotifications,

                markRead,

                markAllRead,

                addNotification,

                deleteNotification,

                fetchNotifications,

            }}

        >

            {children}

        </UIContext.Provider>

    );

};

export const useUI = () => {

    return useContext(UIContext);

};