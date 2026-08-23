import {
  Eye,
  Download,
  Trash2,
  Brain,
  MessageCircle,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ReportTable = ({
  loading,
  reports,
  onDelete,
  onDownload,
  onAnalyze,
  analyzingId,
}) => {

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="report-table-card">
        <p className="loading-text">
          Loading Reports...
        </p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="report-table-card">
        <p className="empty-text">
          No reports found.
        </p>
      </div>
    );
  }

  return (
    <div className="report-table-card">

      <table className="report-table">

        <thead>

          <tr>

            <th>Report</th>

            <th>Type</th>

            <th>Status</th>

            <th>AI Score</th>

            <th>Risk</th>

            <th>Date</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <tr key={report._id}>

              <td>{report.fileName}</td>

              <td>{report.fileType?.toUpperCase()}</td>

              <td>

                <span
                  className={
                    report.analysisStatus === "Completed"
                      ? "status completed"
                      : report.analysisStatus === "Processing"
                        ? "status processing"
                        : "status pending"
                  }
                >
                  {report.analysisStatus}
                </span>

              </td>

              <td>

                {report.confidenceScore
                  ? `${report.confidenceScore}%`
                  : "--"}

              </td>

              <td>

                {report.riskLevel || "--"}

              </td>

              <td>

                {new Date(
                  report.createdAt
                ).toLocaleDateString()}

              </td>

              <td>

                <div className="table-actions">

                  {/* View */}

                  <button
                    className="view-btn"
                    title="View AI Report"
                    onClick={() =>
                      navigate(`/report/${report._id}`)
                    }
                  >
                    <Eye size={17} />
                  </button>

                  {/* Download */}

                  <button
                    className="download-btn"
                    title="Download"
                    onClick={() =>
                      onDownload(report._id)
                    }
                  >
                    <Download size={17} />
                  </button>

                  {/* Analyze */}

                  <button
                    className="analyze-btn"
                    title="Analyze with AI"
                    disabled={
                      analyzingId === report._id
                    }
                    onClick={() =>
                      onAnalyze(report._id)
                    }
                  >

                    {analyzingId === report._id ? (

                      <Loader2
                        size={17}
                        className="spin"
                      />

                    ) : (

                      <Brain size={17} />

                    )}

                  </button>

                  {/* Chat */}

                  <button
                    className="chat-btn"
                    title="Chat with AI"
                    disabled={
                      report.analysisStatus !==
                      "Completed"
                    }
                    onClick={() =>
                      navigate(
                        `/chat/${report._id}`
                      )
                    }
                  >
                    <MessageCircle size={17} />
                  </button>

                  {/* Delete */}

                  <button
                    className="delete-btn"
                    title="Delete"
                    onClick={() =>
                      onDelete(report._id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ReportTable;