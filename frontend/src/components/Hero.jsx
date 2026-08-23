import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Brain, FileText } from "lucide-react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left */}

        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <div className="hero-badge">
            <ShieldCheck size={18}/>
            AI Powered Healthcare Platform
          </div>

          <h1>
            Smart Healthcare
            <span> Powered </span>
            by Artificial Intelligence
          </h1>

          <p>
            Upload medical reports, chat with AI doctors, analyze diseases,
            book appointments and manage your complete healthcare journey.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="primary-btn">
              Get Started
              <ArrowRight size={18}/>
            </Link>

            <button className="secondary-btn">
              Watch Demo
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <h2>10K+</h2>
              <span>Patients</span>
            </div>

            <div>
              <h2>250+</h2>
              <span>Doctors</span>
            </div>

            <div>
              <h2>98%</h2>
              <span>Accuracy</span>
            </div>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900"
            alt="Doctor"
          />

          <div className="hero-card card1">

            <Brain size={24} color="#2563eb"/>

            <div>

              <h4>AI Diagnosis</h4>

              <p>Disease Prediction</p>

            </div>

          </div>

          <div className="hero-card card2">

            <FileText size={24} color="#16a34a"/>

            <div>

              <h4>Medical Reports</h4>

              <p>AI Summary</p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;