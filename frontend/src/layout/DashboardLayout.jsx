import "./DashboardLayout.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="dashboard-body">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default DashboardLayout;