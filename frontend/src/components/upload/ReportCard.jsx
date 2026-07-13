import "./ReportCard.css";

import { useNavigate } from "react-router-dom";
import {
  FileText,
  Image,
  Eye,
  Brain,
  Trash2,
  Download,
  CalendarDays,
  HardDrive,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import {
  analyzeReport,
  deleteReport,
  downloadReport,
} from "../../services/reportServices";

const ReportCard = ({
  report,
  fetchReports,
}) => {
  const navigate = useNavigate();
  const handleAnalyze = async () => {

    try {

      await analyzeReport(report._id);

      await fetchReports();

      navigate(`/report/${report._id}`);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this report?"
    );

    if (!confirmDelete) return;

    try {

      await deleteReport(report._id);

      fetchReports();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDownload = async () => {

    try {

      const data = await downloadReport(report._id);

      window.open(data.downloadUrl, "_blank");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="report-card">

      <div className="report-top">

        <div className="report-icon">

          {

            report.fileType === "image"

              ?

              <Image size={40} />

              :

              <FileText size={40} />

          }

        </div>

        <span
          className={`report-status ${report.analysisStatus === "Completed"
            ? "success"
            : "pending"
            }`}
        >

          {report.analysisStatus}

        </span>

      </div>

      <div className="report-body">

        <h3>

          {report.fileName}

        </h3>

        <div className="report-info">

          <p>

            <CalendarDays size={16} />

            {

              new Date(report.createdAt)
                .toLocaleDateString()

            }

          </p>

          <p>

            <HardDrive size={16} />

            {

              (report.fileSize / 1024 / 1024)
                .toFixed(2)

            }

            MB

          </p>

        </div>

        <div className="report-extra">

          <p>

            Confidence :

            <strong>

              {report.confidenceScore}%

            </strong>

          </p>

          <p
            className={
              report.riskLevel === "High"
                ? "high-risk"
                : report.riskLevel === "Medium"
                  ? "medium-risk"
                  : "low-risk"
            }
          >

            {
              report.riskLevel === "High"
                ?

                <ShieldAlert size={16} />

                :

                <ShieldCheck size={16} />

            }

            {report.riskLevel}

          </p>
        </div>

      </div>

      <div className="report-actions">

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
        >

          <Brain size={18} />

          Analyze

        </button>

        <button
          className="icon-btn"
          onClick={() =>
            window.open(report.fileUrl)
          }
        >

          <Eye size={18} />

        </button>

        <button
          className="icon-btn"
          onClick={handleDownload}
        >

          <Download size={18} />

        </button>

        <button
          className="icon-btn delete"
          onClick={handleDelete}
        >

          <Trash2 size={18} />

        </button>

      </div>

    </div>

  );

};

export default ReportCard;