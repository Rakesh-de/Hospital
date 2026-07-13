import "./ReportCard.css";

import {
  FileText,
  Download,
  MessageCircle,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ReportCard = ({
  report,
}) => {

  const navigate = useNavigate();

  return (

    <div className="report-card">

      <div className="report-left">

        <div className="report-icon">

          <FileText size={22} />

        </div>

        <div>

          <h3>{report.reportName}</h3>

          <p>{report.date}</p>

        </div>

      </div>

      <div className="report-actions">

        {/* View Report */}

        <button
          onClick={() => navigate(`/report/${report._id}`)}
        >
          <Eye size={18} />
        </button>

        {/* Chat with AI */}

        <button
          onClick={() => navigate(`/chat/${report._id}`)}
        >
          <MessageCircle size={18} />
        </button>

        {/* Download */}

        <button
          onClick={() => window.open(report.fileUrl)}
        >
          <Download size={18} />
        </button>

      </div>

    </div>

  );

};

export default ReportCard;