// import "./AdminDashboard.css";



// import { useEffect, useState } from "react";
// import { getAdminDashboard } from "../services/adminService";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// import {
//     Users,
//     FileText,
//     CalendarDays,
//     IndianRupee,
//     Activity,
//     UserCheck,
// } from "lucide-react";

// const AdminDashboard = () => {

//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     const [darkMode, setDarkMode] = useState(false);
//     const [adminData, setAdminData] = useState(null);

//     useEffect(() => {
//         fetchDashboard();
//     }, []);

//     const fetchDashboard = async () => {
//         try {
//             const data = await getAdminDashboard();
//             setAdminData(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const stats = [
//         {
//             title: "Total Users",
//             value: adminData?.stats?.totalUsers || 0,
//             icon: <Users size={28} />,
//         },
//         {
//             title: "Medical Reports",
//             value: adminData?.stats?.totalReports || 0,
//             icon: <FileText size={28} />,
//         },
//         {
//             title: "Appointments",
//             value: adminData?.stats?.totalAppointments || 0,
//             icon: <CalendarDays size={28} />,
//         },
//         {
//             title: "Revenue",
//             value: `₹${adminData?.stats?.totalRevenue || 0}`,
//             icon: <IndianRupee size={28} />,
//         },
//     ];

//     const recentUsers = adminData?.recentUsers || [];

//     return (

//         <div className="dashboard">

//             <Sidebar />

//             <div className="dashboard-content">

//                 <Topbar

//                     sidebarOpen={sidebarOpen}
//                     setSidebarOpen={setSidebarOpen}
//                     darkMode={darkMode}
//                     setDarkMode={setDarkMode}

//                     user={{
//                         name: "Admin",
//                         email: "admin@medimind.ai",
//                     }}

//                 />

//                 <div className="admin-page">

//                     <div className="admin-header">

//                         <h1>Admin Dashboard</h1>

//                         <p>

//                             Monitor users, reports, payments and AI platform.

//                         </p>

//                     </div>

//                     <div className="admin-stats">

//                         {

//                             stats.map((item, index) => (

//                                 <div
//                                     key={index}
//                                     className="admin-card"
//                                 >

//                                     <div>

//                                         <h4>

//                                             {item.title}

//                                         </h4>

//                                         <h2>

//                                             {item.value}

//                                         </h2>

//                                     </div>

//                                     <span>

//                                         {item.icon}

//                                     </span>

//                                 </div>

//                             ))

//                         }

//                     </div>

//                     <div className="admin-section">

//                         <h2>

//                             <UserCheck size={22} />

//                             Recent Users

//                         </h2>

//                         <table className="admin-table">

//                             <thead>

//                                 <tr>

//                                     <th>Name</th>

//                                     <th>Email</th>

//                                     <th>Status</th>

//                                     <th>Action</th>

//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 {
//                                     recentUsers.map((user) => (

//                                         <tr key={user._id}>

//                                             <td>{user.name}</td>

//                                             <td>{user.email}</td>

//                                             <td>

//                                                 <span className={`status ${user.status.toLowerCase()}`}>
//                                                     {user.status}
//                                                 </span>

//                                             </td>

//                                             <td>

//                                                 <button>
//                                                     View
//                                                 </button>

//                                             </td>

//                                         </tr>

//                                     ))
//                                 }

//                             </tbody>

//                         </table>

//                     </div>

//                     <div className="analytics-card">

//                         <Activity size={24} />

//                         <div>

//                             <h3>AI Platform Health</h3>

//                             <p>

//                                 All AI Agents, OCR Pipeline, ML Models and RAG
//                                 Services are running normally.

//                             </p>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

// };

// export default AdminDashboard;

import "./AdminDashboard.css";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminService";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
    Users,
    FileText,
    CalendarDays,
    IndianRupee,
    Activity,
    UserCheck,
} from "lucide-react";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const data = await getAdminDashboard();
            setAdminData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const stats = [
        {
            title: "Total Users",
            value: adminData?.stats?.totalUsers || 0,
            icon: <Users size={28} />,
        },
        {
            title: "Medical Reports",
            value: adminData?.stats?.totalReports || 0,
            icon: <FileText size={28} />,
        },
        {
            title: "Appointments",
            value: adminData?.stats?.totalAppointments || 0,
            icon: <CalendarDays size={28} />,
        },
        {
            title: "Revenue",
            value: `₹${adminData?.stats?.totalRevenue || 0}`,
            icon: <IndianRupee size={28} />,
        },
    ];

    const recentUsers = adminData?.recentUsers || [];

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
                        name: "Admin",
                        email: "admin@medimind.ai",
                    }}
                />

                <div className="admin-page">
                    <div className="admin-header">
                        <h1>Admin Dashboard</h1>
                        <p>Monitor users, reports, payments and AI platform.</p>
                    </div>

                    <div className="admin-stats">
                        {stats.map((item, index) => (
                            <div key={index} className="admin-card">
                                <div>
                                    <h4>{item.title}</h4>
                                    <h2>{item.value}</h2>
                                </div>
                                <span>{item.icon}</span>
                            </div>
                        ))}
                    </div>

                    <div className="admin-section">
                        <h2>
                            <UserCheck size={22} />
                            Recent Users
                        </h2>

                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {/* Fix: Optional chaining and default value fallback */}
                                            <span
                                                className={`status ${(
                                                    user?.status || "active"
                                                ).toLowerCase()}`}
                                            >
                                                {user?.status || "Active"}
                                            </span>
                                        </td>
                                        <td>
                                            <button>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="analytics-card">
                        <Activity size={24} />
                        <div>
                            <h3>AI Platform Health</h3>
                            <p>
                                All AI Agents, OCR Pipeline, ML Models and RAG
                                Services are running normally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;