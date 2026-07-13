import { useEffect, useState } from "react";

import "./Report.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import ReportStats from "../components/reports/ReportStats";
import ReportFilter from "../components/reports/ReportFilter";
import ReportTable from "../components/reports/ReportTable";

import {
  getReports,
  deleteReport,
  downloadReport,
} from "../services/reportServices";

const Reports = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [reports, setReports] = useState([]);

  const [filteredReports, setFilteredReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  useEffect(() => {

    fetchReports();

  }, []);

  useEffect(() => {

    let data = [...reports];

    if (search !== "") {

      data = data.filter((report) =>
        report.fileName
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (status !== "All") {

      data = data.filter(
        (report) => report.analysisStatus === status
      );

    }

    setFilteredReports(data);

  }, [reports, search, status]);

  const fetchReports = async () => {

    try {

      setLoading(true);

      const data = await getReports();

      setReports(data.reports);

      setFilteredReports(data.reports);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

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

  const handleDownload = async (id) => {

    try {

      const data = await downloadReport(id);

      window.open(data.downloadUrl, "_blank");

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

                View, search, download and manage all
                uploaded reports.

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
            onDelete={handleDelete}
            onDownload={handleDownload}
          />

        </div>

      </div>

    </div>

  );

};

export default Reports;