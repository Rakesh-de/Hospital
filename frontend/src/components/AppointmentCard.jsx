import "./AppointmentCard.css";
import {
  CalendarDays,
  Clock,
  UserRound,
  Video,
  MapPin,
} from "lucide-react";

const AppointmentCard = ({ appointment }) => {

  return (

    <div className="appointment-card">

      <div className="appointment-top">

        <div>

          <h3>{appointment.doctor}</h3>

          <p>{appointment.specialization}</p>

        </div>

        <span
          className={`appointment-status ${appointment.status.toLowerCase()}`}
        >
          {appointment.status}
        </span>

      </div>

      <div className="appointment-info">

        <p>

          <CalendarDays size={17} />

          {appointment.date}

        </p>

        <p>

          <Clock size={17} />

          {appointment.time}

        </p>

        <p>

          <Video size={17} />

          Online Consultation

        </p>

        <p>

          <MapPin size={17} />

          AI Healthcare Center

        </p>

      </div>

      <div className="appointment-actions">

        <button className="reschedule-btn">

          Reschedule

        </button>

        <button className="cancel-btn">

          Cancel

        </button>

      </div>

    </div>

  );

};

export default AppointmentCard;