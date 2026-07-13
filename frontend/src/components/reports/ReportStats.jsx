import {
  FileText,
  CheckCircle2,
  Clock3,
  Activity,
} from "lucide-react";

const ReportStats = ({ reports }) => {

  const totalReports = reports.length;

  const analyzedReports = reports.filter(
    (report) => report.analysisStatus === "Completed"
  ).length;

  const pendingReports = reports.filter(
    (report) => report.analysisStatus === "Pending"
  ).length;

  const averageScore =
    reports.length > 0
      ? Math.round(
          reports.reduce(
            (sum, report) =>
              sum + (report.confidenceScore || 0),
            0
          ) / reports.length
        )
      : 0;

  const cards = [
    {
      id: 1,
      title: "Total Reports",
      value: totalReports,
      icon: <FileText size={28} />,
      color: "#2563eb",
    },
    {
      id: 2,
      title: "Analyzed",
      value: analyzedReports,
      icon: <CheckCircle2 size={28} />,
      color: "#10b981",
    },
    {
      id: 3,
      title: "Pending",
      value: pendingReports,
      icon: <Clock3 size={28} />,
      color: "#f59e0b",
    },
    {
      id: 4,
      title: "Average AI Score",
      value: `${averageScore}%`,
      icon: <Activity size={28} />,
      color: "#ef4444",
    },
  ];

  return (

    <div className="report-stats">

      {

        cards.map((card) => (

          <div
            className="stat-card"
            key={card.id}
          >

            <div
              className="stat-icon"
              style={{
                background: card.color,
              }}
            >

              {card.icon}

            </div>

            <div>

              <h3>

                {card.value}

              </h3>

              <p>

                {card.title}

              </p>

            </div>

          </div>

        ))

      }

    </div>

  );

};

export default ReportStats;