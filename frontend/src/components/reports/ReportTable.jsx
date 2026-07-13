import {
  Eye,
  Download,
  Trash2,
  Brain,
  MessageCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ReportTable = ({
  loading,
  reports,
  onDelete,
  onDownload,
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

            <th>Date</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            reports.map((report) => (

              <tr key={report._id}>

                <td>

                  {report.fileName}

                </td>

                <td>

                  {report.fileType?.toUpperCase()}

                </td>

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

                <td>

                  {

                    report.confidenceScore

                      ? `${report.confidenceScore}%`

                      : "--"

                  }

                </td>

                <td>

                  {

                    new Date(
                      report.createdAt
                    ).toLocaleDateString()

                  }

                </td>

                <td>

                  <div className="table-actions">

                    <button

                      className="view-btn"

                      onClick={() =>

                        window.open(
                          report.fileUrl,
                          "_blank"
                        )

                      }

                    >

                      <Eye size={17} />

                    </button>

                    <button

                      className="download-btn"

                      onClick={() =>
                        onDownload(report._id)
                      }

                    >

                      <Download size={17} />

                    </button>

                    <button

                      className="analyze-btn"

                      onClick={() =>

                        navigate(

                          `/report/${report._id}`

                        )

                      }

                    >

                      <Brain size={17} />

                    </button>
                    <button
                      className="chat-btn"
                      onClick={() => navigate(`/chat/${report._id}`)}
                      title="Chat with AI"
                    >
                      <MessageCircle size={17} />
                    </button>


                    <button

                      className="delete-btn"

                      onClick={() =>
                        onDelete(report._id)
                      }

                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

};

export default ReportTable;