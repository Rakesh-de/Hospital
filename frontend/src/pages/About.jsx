import "./About.css";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Brain,
  ShieldCheck,
  Users,
  Award,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {

  const stats = [

    {
      id:1,
      value:"25K+",
      title:"Medical Reports Analyzed"
    },

    {
      id:2,
      value:"10K+",
      title:"Happy Patients"
    },

    {
      id:3,
      value:"150+",
      title:"Verified Doctors"
    },

    {
      id:4,
      value:"98%",
      title:"AI Prediction Accuracy"
    }

  ];

  const features=[

    {

      id:1,

      icon:<Brain size={40}/>,

      title:"AI Powered Diagnosis",

      description:
      "Analyze blood tests, MRI, CT Scan, X-Ray and other medical reports using Generative AI, Machine Learning and Multi-Agent AI."

    },

    {

      id:2,

      icon:<ShieldCheck size={40}/>,

      title:"Secure Healthcare",

      description:
      "JWT Authentication, Cloudinary Storage and encrypted medical records keep every report secure."

    },

    {

      id:3,

      icon:<HeartHandshake size={40}/>,

      title:"Personal Health Insights",

      description:
      "Receive personalized recommendations, risk analysis and easy-to-understand medical summaries."

    }

  ];

  const team=[

    {

      id:1,

      name:"Artificial Intelligence",

      role:"Medical Report Analysis",

      icon:<Brain size={32}/>

    },

    {

      id:2,

      name:"Healthcare Specialists",

      role:"Clinical Validation",

      icon:<Stethoscope size={32}/>

    },

    {

      id:3,

      name:"Patient Support",

      role:"24 × 7 Assistance",

      icon:<Users size={32}/>

    }

  ];

  return(

    <>

      <Navbar/>

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="container">

          <div className="about-left">

            <span className="about-badge">

              <Award size={18}/>

              Next Generation AI Healthcare Platform

            </span>

            <h1>

              Transforming

              <span> Healthcare </span>

              with Artificial Intelligence

            </h1>

            <p>

              MediMind AI helps patients understand medical reports using
              OCR, OpenCV, Machine Learning, RAG, LangGraph Multi-Agent AI
              and Generative AI. Upload your report and receive accurate,
              easy-to-understand medical insights within seconds.

            </p>

            <div className="about-buttons">

              <Link
                to="/upload-report"
                className="primary-btn"
              >

                Upload Report

              </Link>

              <Link
                to="/contact"
                className="secondary-btn"
              >

                Contact Us

                <ArrowRight size={18}/>

              </Link>

            </div>

          </div>

          <div className="about-right">

            <div className="about-image-card">

              <img
                src="/images/about-doctor.png"
                alt="AI Healthcare"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="about-stats">

        <div className="container stats-grid">

          {

            stats.map((item)=>(

              <div
                className="stat-card"
                key={item.id}
              >

                <h2>

                  {item.value}

                </h2>

                <p>

                  {item.title}

                </p>

              </div>

            ))

          }

        </div>

      </section>
            {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="container">

          <div className="section-title">

            <h2>

              Why Choose MediMind AI?

            </h2>

            <p>

              We combine Artificial Intelligence,
              Machine Learning, OCR, OpenCV,
              RAG and Multi-Agent AI to provide
              smarter healthcare solutions.

            </p>

          </div>

          <div className="feature-grid">

            {

              features.map((feature)=>(

                <div
                  key={feature.id}
                  className="feature-card"
                >

                  <div className="feature-icon">

                    {feature.icon}

                  </div>

                  <h3>

                    {feature.title}

                  </h3>

                  <p>

                    {feature.description}

                  </p>

                </div>

              ))

            }

          </div>

        </div>

      </section>

      {/* ================= MISSION & VISION ================= */}

      <section className="mission-section">

        <div className="container mission-grid">

          <div className="mission-card">

            <h2>

              Our Mission

            </h2>

            <p>

              To simplify healthcare by enabling every patient to
              understand their medical reports using Artificial
              Intelligence, reducing confusion and improving
              healthcare awareness.

            </p>

          </div>

          <div className="mission-card">

            <h2>

              Our Vision

            </h2>

            <p>

              To become the world's most trusted AI Healthcare
              Platform where every patient can access intelligent,
              secure and affordable healthcare assistance.

            </p>

          </div>

        </div>

      </section>

      {/* ================= TEAM ================= */}

      <section className="team-section">

        <div className="container">

          <div className="section-title">

            <h2>

              Who Powers MediMind AI?

            </h2>

            <p>

              Our platform combines Artificial Intelligence,
              healthcare experts and secure cloud technologies.

            </p>

          </div>

          <div className="team-grid">

            {

              team.map((member)=>(

                <div
                  key={member.id}
                  className="team-card"
                >

                  <div className="team-icon">

                    {member.icon}

                  </div>

                  <h3>

                    {member.name}

                  </h3>

                  <span>

                    {member.role}

                  </span>

                </div>

              ))

            }

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div className="container">

          <h2>

            Ready to Experience AI Healthcare?

          </h2>

          <p>

            Upload your medical reports and receive
            AI-powered insights within seconds.

          </p>

          <Link
            to="/upload-report"
            className="cta-btn"
          >

            Upload Medical Report

          </Link>

        </div>

      </section>

      <Footer/>

    </>

  );

};

export default About;