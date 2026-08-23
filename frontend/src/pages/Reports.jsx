import { useEffect, useState } from "react";

import "./Report.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import ReportStats from "../components/reports/ReportStats";
import ReportFilter from "../components/reports/ReportFilter";
import ReportTable from "../components/reports/ReportTable";
import { useNavigate } from "react-router-dom";
import {
  getReports,
  deleteReport,
  downloadReport,
  analyzeReport,
} from "../services/reportServices";

const Reports = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [reports, setReports] = useState([]);

  const [filteredReports, setFilteredReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [analyzingId, setAnalyzingId] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  useEffect(() => {

    fetchReports();

  }, []);

  useEffect(() => {

    let data = [...reports];

    if (search) {

      data = data.filter((report) =>
        report.fileName
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (status !== "All") {

      data = data.filter(
        (report) =>
          report.analysisStatus === status
      );

    }

    setFilteredReports(data);

  }, [reports, search, status]);

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

  // ==========================
  // Analyze
  // ==========================

const handleAnalyze = async (id) => {
  try {
    setAnalyzingId(id);

    setReports((prev) =>
      prev.map((r) =>
        r._id === id
          ? {
              ...r,
              analysisStatus: "Processing",
            }
          : r
      )
    );

    const response = await analyzeReport(id);

    if (response.success) {
      await fetchReports();

      navigate(`/reports/${id}`);   // <-- AI details page open
    } else {
      alert("Analysis Failed");
    }
  } catch (error) {
    console.log(error);
    alert("Analysis Failed");
    await fetchReports();
  } finally {
    setAnalyzingId(null);
  }
};

  // ==========================
  // Delete
  // ==========================

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Delete this report?"
    );

    if (!ok) return;

    try {

      await deleteReport(id);

      fetchReports();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Download
  // ==========================

  const handleDownload = async (id) => {

    try {

      const data =
        await downloadReport(id);

      window.open(
        data.downloadUrl,
        "_blank"
      );

    } catch (error) {

      console.log(error);

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

        <div className="reports-page">

          <div className="page-header">

            <div>

              <h1>

                My Medical Reports

              </h1>

              <p>

                Upload, Analyze and
                Manage all Medical Reports.

              </p>

            </div>

          </div>

          <ReportStats reports={reports} />

          <ReportFilter
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />

          <ReportTable
            loading={loading}
            reports={filteredReports}
            analyzingId={analyzingId}
            onAnalyze={handleAnalyze}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />

        </div>

      </div>

    </div>

  );

};

export default Reports;