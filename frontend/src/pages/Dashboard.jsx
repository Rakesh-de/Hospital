import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import ActivityCard from "../components/ActivityCard";

import { useEffect, useState } from "react";

import {
  getDashboardStats,
  downloadReport,
  deleteReport,
} from "../services/reportServices";


import {
  FileText,
  MessageSquare,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);

  const stats = [
    {
      title: "Reports",
      value: dashboardData?.stats?.totalReports || 0,
      percentage: `${dashboardData?.stats?.totalPercentage || 0}%`,
      color: "#2563eb",
    },
    {
      title: "Analyzed",
      value: dashboardData?.stats?.analyzedReports || 0,
      percentage: `${dashboardData?.stats?.analyzedPercentage || 0}%`,
      color: "#10b981",
    },
    {
      title: "Pending",
      value: dashboardData?.stats?.pendingReports || 0,
      percentage: `${dashboardData?.stats?.pendingPercentage || 0}%`,
      color: "#f59e0b",
    },
    {
      title: "Health Score",
      value: dashboardData?.stats?.healthScore || 0,
      percentage: `${dashboardData?.stats?.criticalPercentage || 0}%`,
      color: "#ef4444",
    },
  ];

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const data = await getDashboardStats();

        setDashboardData(data);

      }

      catch (err) {

        console.log(err);

      }

    };

    fetchDashboard();

  }, []);
  // 👇 YAHAN LIKHNA HAI
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this report?"
    );

    if (!confirmDelete) return;

    try {

      await deleteReport(id);

      const data = await getDashboardStats();

      setDashboardData(data);

    } catch (error) {

      console.log(error);

    }

  };
  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar />

        <div className="dashboard-body">

          <div className="welcome-section">

            <h1>
              Welcome Back 👋
            </h1>

            <p>

              Here's your healthcare overview.

            </p>

          </div>

          <div className="stats-grid">

            {stats.map((item, index) => (
              <StatsCard
                key={index}
                title={item.title}
                value={item.value}
                icon={item.icon}
                color={item.color}
                percentage={item.percentage}
                trend={item.trend}
              />
            ))}



          </div>

          <div className="activity-grid">

            {
              dashboardData?.activities?.map((activity, index) => (

                <ActivityCard

                  key={index}

                  title={activity.title}

                  description={activity.description}

                  time={new Date(activity.time).toLocaleDateString()}

                  status={activity.status}

                />

              ))
            }

          </div>

          <div className="dashboard-row">

            <div className="dashboard-card">

              <h2>Recent Reports</h2>

              <table className="report-table">

                <thead>

                  <tr>

                    <th>Report</th>

                    <th>Type</th>

                    <th>Status</th>

                    <th>AI Score</th>

                    <th>Date</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {dashboardData?.recentReports?.map((report) => (

                    <tr key={report._id}>

                      <td>{report.fileName}</td>

                      <td>{report.fileType.toUpperCase()}</td>

                      <td>

                        <span
                          className={
                            report.analysisStatus === "Completed"
                              ? "status completed"
                              : "status pending"
                          }
                        >
                          {report.analysisStatus}
                        </span>

                      </td>

                      <td>{report.confidenceScore}%</td>

                      <td>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
                            className="view-btn"
                            onClick={() => window.open(report.fileUrl, "_blank")}
                          >
                            View
                          </button>
                          <button
                            className="download-btn"
                            onClick={async () => {

                              const data = await downloadReport(report._id);

                              window.open(data.downloadUrl, "_blank");

                            }}
                          >
                            Download
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(report._id)}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <div className="dashboard-card">

              <h2>AI Health Summary</h2>

              <div className="health-summary">

                <div className="summary-item">
                  <span>Overall Health Score</span>

                  <strong>
                    {dashboardData?.stats?.healthScore || 0}%
                  </strong>

                </div>

                <div className="summary-item">

                  <span>Risk Level</span>

                  <strong>
                    {dashboardData?.stats?.riskLevel || "N/A"}
                  </strong>

                </div>

                <div className="summary-item">

                  <span>Last Analysis</span>

                  <strong>
                    {dashboardData?.stats?.lastAnalysis
                      ? new Date(
                        dashboardData.stats.lastAnalysis
                      ).toLocaleDateString()
                      : "No Reports"}
                  </strong>

                </div>

                <button className="primary-btn">
                  View Full Analysis
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;