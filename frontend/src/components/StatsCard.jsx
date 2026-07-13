import "./StatsCard.css";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon,
  color,
  percentage = "+0%",
  trend = "up",
}) => {
  return (
    <div className="stats-card">

      <div className="stats-header">

        <div
          className="stats-icon"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

        <div
          className={`stats-percentage ${
            trend === "up" ? "positive" : "negative"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={15} />
          ) : (
            <TrendingDown size={15} />
          )}

          <span>{percentage}</span>
        </div>

      </div>

      <div className="stats-body">

        <h2>{value}</h2>

        <p>{title}</p>

      </div>

    </div>
  );
};

export default StatsCard;