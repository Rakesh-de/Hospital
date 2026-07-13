import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

import UploadArea from "./UploadArea";
import ReportCard from "./ReportCard";

import {
  getReports,
} from "../../services/reportServices";

import "./UploadReport.css";

const UploadReport = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      setLoading(true);

      const data = await getReports();

      setReports(data.reports);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

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
            name: "Rakesh Prajapat",
            email: "rakesh@gmail.com",
          }}
        />

        <div className="upload-page">

          {/* Header */}

          <div className="page-header">

            <div>

              <h1>Upload Medical Report</h1>

              <p>

                Upload PDF, JPG or PNG reports for AI analysis.

              </p>

            </div>

            <button className="upload-btn">

              <Upload size={18} />

              Upload

            </button>

          </div>

          {/* Upload Area */}

          <UploadArea
            fetchReports={fetchReports}
          />

          {/* Recent Reports */}

          <div className="recent-section">

            <h2>Recent Uploads</h2>

            {
              loading ? (

                <p className="loading-text">
                  Loading Reports...
                </p>
              ) : reports.length === 0 ? (

                <p className="empty-text">
                  No reports uploaded yet.
                </p>

              ) : (

                <div className="reports-grid">

                  {

                    reports.map((report) => (

                      <ReportCard

                        key={report._id}

                        report={report}

                        fetchReports={fetchReports}

                      />

                    ))

                  }

                </div>

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

};

export default UploadReport;