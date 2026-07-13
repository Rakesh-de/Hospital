import "./Appointments.css";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AppointmentCard from "../components/AppointmentCard";

import { CalendarPlus } from "lucide-react";

const Appointments = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    setAppointments([
      {
        _id: 1,
        doctor: "Dr. Raj Sharma",
        specialization: "Cardiologist",
        date: "15 July 2026",
        time: "10:30 AM",
        status: "Upcoming",
      },
      {
        _id: 2,
        doctor: "Dr. Priya Singh",
        specialization: "Neurologist",
        date: "18 July 2026",
        time: "02:00 PM",
        status: "Completed",
      },
    ]);

  }, []);

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
            name: "Rakesh",
            email: "rakesh@gmail.com",
          }}
        />

        <div className="appointments-page">

          <div className="appointments-header">

            <div>

              <h1>Appointments</h1>

              <p>

                Manage all your doctor appointments.

              </p>

            </div>

            <button className="book-btn">

              <CalendarPlus size={18} />

              Book Appointment

            </button>

          </div>

          <div className="appointments-grid">

            {
              appointments.map((appointment) => (

                <AppointmentCard

                  key={appointment._id}

                  appointment={appointment}

                />

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );

};

export default Appointments;