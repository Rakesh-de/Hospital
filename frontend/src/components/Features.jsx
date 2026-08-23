import "./Features.css";

import {
  Brain,
  FileText,
  CalendarDays,
  ShieldCheck,
  Activity,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Diagnosis",
    description:
      "Advanced AI analyzes symptoms and generates intelligent healthcare insights.",
  },
  {
    icon: FileText,
    title: "Medical Reports",
    description:
      "Upload reports and receive AI-generated summaries with highlighted findings.",
  },
  {
    icon: CalendarDays,
    title: "Appointment Booking",
    description:
      "Book appointments with doctors through a seamless scheduling experience.",
  },
  {
    icon: Bot,
    title: "Multi-Agent AI",
    description:
      "Supervisor, Research and Medical agents collaborate to produce better responses.",
  },
  {
    icon: Activity,
    title: "Health Analytics",
    description:
      "Visualize patient history, reports and health trends using dashboards.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Records",
    description:
      "JWT authentication, encrypted passwords and secure medical document storage.",
  },
];

const Features = () => {
  return (
    <section className="features">

      <div className="features-container">

        <div className="features-header">

          <span>FEATURES</span>

          <h2>Everything You Need</h2>

          <p>
            A complete AI-powered healthcare platform designed for patients,
            doctors and hospitals.
          </p>

        </div>

        <div className="features-grid">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <div className="feature-card" key={index}>

                <div className="feature-icon">

                  <Icon size={30} />

                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default Features;