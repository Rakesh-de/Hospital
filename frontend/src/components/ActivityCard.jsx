import "./ActivityCard.css";
import {
  FileText,
  Brain,
  CalendarDays,
} from "lucide-react";

const ActivityCard = ({
  title,
  description,
  time,
  status = "completed",
}) => {

  const getIcon = () => {

    if (title.toLowerCase().includes("report"))
      return <FileText size={20} />;

    if (title.toLowerCase().includes("ai"))
      return <Brain size={20} />;

    if (title.toLowerCase().includes("appointment"))
      return <CalendarDays size={20} />;

    return <FileText size={20} />;
  };

  return (

    <div className="activity-card">

      <div className="activity-left">

        <div className={`activity-icon ${status}`}>

          {getIcon()}

        </div>

        <div className="activity-content">

          <h4>{title}</h4>

          <p>{description}</p>

        </div>

      </div>

      <span className="activity-time">
        {time}
      </span>

    </div>

  );

};

export default ActivityCard;