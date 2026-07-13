import "./Contact.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send
} from "lucide-react";

import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    subject: "",

    message: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    // Backend API yahan connect hogi

  };

  return (

    <>

      <Navbar />

      {/* HERO */}

      <section className="contact-hero">

        <div className="container">

          <h1>

            Contact MediMind AI

          </h1>

          <p>

            Have questions about AI medical analysis,
            appointments or healthcare services?
            We'd love to hear from you.

          </p>

        </div>

      </section>

      {/* CONTACT INFO */}

      <section className="contact-info">

        <div className="container">

          <div className="contact-grid">

            <div className="info-card">

              <Phone size={35} />

              <h3>

                Call Us

              </h3>

              <p>

                +91 9876543210

              </p>

            </div>

            <div className="info-card">

              <Mail size={35} />

              <h3>

                Email

              </h3>

              <p>

                support@medimind.ai

              </p>

            </div>

            <div className="info-card">

              <MapPin size={35} />

              <h3>

                Address

              </h3>

              <p>

                Jaipur, Rajasthan, India

              </p>

            </div>

            <div className="info-card">

              <Clock size={35} />

              <h3>

                Working Hours

              </h3>

              <p>

                Mon - Sat : 9 AM - 8 PM

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT FORM */}

      <section className="contact-form-section">

        <div className="container">

          <div className="form-wrapper">

            <div className="form-left">

              <h2>

                Send Us A Message

              </h2>

              <p>

                Fill out the form and our healthcare
                support team will contact you shortly.

              </p>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit">

                  <Send size={18} />

                  Send Message

                </button>

              </form>

            </div>

            <div className="form-right">

              <div className="map-box">

                Google Map

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* ================= FAQ ================= */}

      <section className="contact-faq">

        <div className="container">

          <div className="section-title">

            <h2>

              Frequently Asked Questions

            </h2>

            <p>

              Find quick answers to common questions about
              MediMind AI.

            </p>

          </div>

          <div className="faq-grid">

            <div className="faq-card">

              <h3>

                Is MediMind AI free?

              </h3>

              <p>

                Yes. You can create an account and use
                basic AI report analysis for free.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Is my medical report secure?

              </h3>

              <p>

                Yes. Your reports are protected using
                JWT Authentication, encrypted storage
                and secure cloud infrastructure.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Which reports are supported?

              </h3>

              <p>

                Blood Test, CBC, MRI, CT Scan,
                X-Ray, Prescription and other
                medical documents.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                How fast is AI analysis?

              </h3>

              <p>

                Most reports are analyzed within a
                few seconds depending on file size.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="contact-cta">

        <div className="container">

          <h2>

            Ready To Experience AI Healthcare?

          </h2>

          <p>

            Upload your medical report and receive
            AI-powered insights in minutes.

          </p>

          <button className="contact-btn">

            Get Started

          </button>

        </div>

      </section>

      <Footer/>

    </>

  );

};

export default Contact;