import "./Features.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Brain,
  ScanSearch,
  ShieldCheck,
  MessageSquareHeart,
  Bot,
  Database,
  Microscope,
  Activity,
  ArrowRight,
  Cpu,
  Cloud,
  FileSearch
} from "lucide-react";

const Features = () => {

  const features = [

    {
      id:1,
      icon:<Brain size={38}/>,
      title:"AI Medical Analysis",
      description:"Understand blood reports, MRI, CT Scan, X-Ray and pathology reports using Generative AI."
    },

    {
      id:2,
      icon:<ScanSearch size={38}/>,
      title:"OCR Extraction",
      description:"Automatically extracts text from PDFs and images using OCR."
    },

    {
      id:3,
      icon:<Bot size={38}/>,
      title:"Multi-Agent AI",
      description:"Supervisor Agent coordinates specialized AI agents for better diagnosis."
    },

    {
      id:4,
      icon:<Database size={38}/>,
      title:"Medical RAG",
      description:"Answers are generated using trusted medical knowledge instead of hallucinations."
    },

    {
      id:5,
      icon:<Microscope size={38}/>,
      title:"Machine Learning",
      description:"ML models predict disease risk from extracted medical values."
    },

    {
      id:6,
      icon:<Activity size={38}/>,
      title:"Health Score",
      description:"Overall health score generated from AI and ML prediction."
    },

    {
      id:7,
      icon:<MessageSquareHeart size={38}/>,
      title:"AI Chat",
      description:"Ask unlimited questions about your uploaded reports."
    },

    {
      id:8,
      icon:<ShieldCheck size={38}/>,
      title:"Secure Reports",
      description:"JWT Authentication and encrypted storage protect every report."
    },

    {
      id:9,
      icon:<Cpu size={38}/>,
      title:"FastAPI Backend",
      description:"High-performance AI inference using FastAPI."
    },

    {
      id:10,
      icon:<Cloud size={38}/>,
      title:"Cloud Storage",
      description:"Upload and access reports securely from anywhere."
    },

    {
      id:11,
      icon:<FileSearch size={38}/>,
      title:"Doctor Friendly Reports",
      description:"AI generates easy-to-understand summaries for doctors and patients."
    },

    {
      id:12,
      icon:<Brain size={38}/>,
      title:"Future Prediction",
      description:"Predict future disease risks using ML and previous reports."
    }

  ];

  return (

    <>

      <Navbar/>

      <section className="feature-hero">

        <div className="container">

          <h1>

            Powerful AI Features

          </h1>

          <p>

            MediMind AI combines MERN Stack, FastAPI,
            Machine Learning, OpenCV, OCR,
            LangGraph Multi-Agent AI and RAG
            to build an intelligent healthcare platform.

          </p>

        </div>

      </section>

      <section className="feature-section">

        <div className="container">

          <div className="feature-grid">

            {

              features.map((item)=>(

                <div
                  key={item.id}
                  className="feature-card"
                >

                  <div className="feature-icon">

                    {item.icon}

                  </div>

                  <h3>

                    {item.title}

                  </h3>

                  <p>

                    {item.description}

                  </p>

                </div>

              ))

            }

          </div>

        </div>

      </section>
            {/* ================= AI WORKFLOW ================= */}

      <section className="workflow-section">

        <div className="container">

          <div className="section-title">

            <h2>

              AI Healthcare Workflow

            </h2>

            <p>

              Every uploaded report passes through an intelligent
              AI pipeline before generating the final analysis.

            </p>

          </div>

          <div className="workflow-grid">

            <div className="workflow-card">

              <span>01</span>

              <h3>Upload Report</h3>

              <p>

                Upload PDF, Blood Report, MRI, CT Scan,
                X-Ray or Medical Images.

              </p>

            </div>

            <div className="workflow-card">

              <span>02</span>

              <h3>OCR & OpenCV</h3>

              <p>

                Extract text and preprocess medical
                images automatically.

              </p>

            </div>

            <div className="workflow-card">

              <span>03</span>

              <h3>Machine Learning</h3>

              <p>

                Predict disease probability and
                generate confidence score.

              </p>

            </div>

            <div className="workflow-card">

              <span>04</span>

              <h3>Multi-Agent AI</h3>

              <p>

                LangGraph agents collaborate to
                understand medical information.

              </p>

            </div>

            <div className="workflow-card">

              <span>05</span>

              <h3>Medical RAG</h3>

              <p>

                Retrieve trusted medical knowledge
                before generating answers.

              </p>

            </div>

            <div className="workflow-card">

              <span>06</span>

              <h3>Final AI Report</h3>

              <p>

                Patient receives summary,
                health score and recommendations.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= TECHNOLOGY ================= */}

      <section className="technology-section">

        <div className="container">

          <div className="section-title">

            <h2>

              Technology Stack

            </h2>

            <p>

              Production-ready technologies powering
              MediMind AI.

            </p>

          </div>

          <div className="tech-grid">

            <div className="tech-card">React.js</div>

            <div className="tech-card">Node.js</div>

            <div className="tech-card">Express.js</div>

            <div className="tech-card">MongoDB</div>

            <div className="tech-card">FastAPI</div>

            <div className="tech-card">Python</div>

            <div className="tech-card">OpenCV</div>

            <div className="tech-card">EasyOCR</div>

            <div className="tech-card">Scikit-Learn</div>

            <div className="tech-card">LangGraph</div>

            <div className="tech-card">LangChain</div>

            <div className="tech-card">Groq Llama 3.3</div>

            <div className="tech-card">JWT</div>

            <div className="tech-card">Cloudinary</div>

            <div className="tech-card">RAG</div>

            <div className="tech-card">REST API</div>

          </div>

        </div>

      </section>

      {/* ================= BENEFITS ================= */}

      <section className="benefit-section">

        <div className="container">

          <div className="section-title">

            <h2>

              Why Patients Love MediMind AI

            </h2>

          </div>

          <div className="benefit-grid">

            <div className="benefit-card">

              <h3>

                Faster Diagnosis

              </h3>

              <p>

                AI reduces report understanding
                time from hours to seconds.

              </p>

            </div>

            <div className="benefit-card">

              <h3>

                Easy Language

              </h3>

              <p>

                Converts difficult medical
                terminology into simple English.

              </p>

            </div>

            <div className="benefit-card">

              <h3>

                Personalized Insights

              </h3>

              <p>

                Recommendations generated
                according to uploaded reports.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="feature-cta">

        <div className="container">

          <h2>

            Experience AI Powered Healthcare Today

          </h2>

          <p>

            Upload your first medical report and
            receive AI-generated insights instantly.

          </p>

          <button className="feature-btn">

            Upload Report

            <ArrowRight size={18}/>

          </button>

        </div>

      </section>

      <Footer/>

    </>

  );

};

export default Features;