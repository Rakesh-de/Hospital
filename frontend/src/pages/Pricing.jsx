import "./Pricing.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  CheckCircle,
  Star,
  Crown,
  ArrowRight
} from "lucide-react";

const Pricing = () => {

  const plans = [

    {
      id:1,
      name:"Free",
      price:"₹0",
      duration:"Forever",
      badge:"Starter",
      button:"Get Started",
      popular:false,

      features:[
        "5 AI Report Analysis / Month",
        "OCR Report Extraction",
        "Basic AI Summary",
        "Health Score",
        "Email Support"
      ]

    },

    {

      id:2,

      name:"Pro",

      price:"₹499",

      duration:"Per Month",

      badge:"Most Popular",

      button:"Upgrade Now",

      popular:true,

      features:[

        "Unlimited AI Analysis",

        "AI Chat Assistant",

        "Medical RAG",

        "Disease Risk Prediction",

        "Appointment Booking",

        "Priority Support",

        "Download Reports"

      ]

    },

    {

      id:3,

      name:"Hospital",

      price:"Custom",

      duration:"Enterprise",

      badge:"Enterprise",

      button:"Contact Sales",

      popular:false,

      features:[

        "Unlimited Patients",

        "Doctor Dashboard",

        "Admin Dashboard",

        "Analytics",

        "Cloud Deployment",

        "Dedicated Support",

        "API Access"

      ]

    }

  ];

  return(

    <>

      <Navbar/>

      <section className="pricing-hero">

        <div className="container">

          <h1>

            Simple Pricing

          </h1>

          <p>

            Choose the perfect plan for your healthcare journey.

          </p>

        </div>

      </section>

      <section className="pricing-section">

        <div className="container">

          <div className="pricing-grid">

            {

              plans.map((plan)=>(

                <div

                  key={plan.id}

                  className={

                    plan.popular

                    ?

                    "pricing-card active"

                    :

                    "pricing-card"

                  }

                >

                  {

                    plan.popular &&

                    <div className="popular">

                      <Star size={16}/>

                      Most Popular

                    </div>

                  }

                  <h3>

                    {plan.name}

                  </h3>

                  <h2>

                    {plan.price}

                  </h2>

                  <span>

                    {plan.duration}

                  </span>

                  <ul>

                    {

                      plan.features.map((item,index)=>(

                        <li key={index}>

                          <CheckCircle size={18}/>

                          {item}

                        </li>

                      ))

                    }

                  </ul>

                  <button>

                    {plan.button}

                    <ArrowRight size={18}/>

                  </button>

                </div>

              ))

            }

          </div>

        </div>

      </section>
            {/* ================= PAYMENT ================= */}

      <section className="payment-section">

        <div className="container">

          <div className="section-title">

            <h2>

              Secure Payments

            </h2>

            <p>

              Upgrade your healthcare experience with
              secure online payments.

            </p>

          </div>

          <div className="payment-grid">

            <div className="payment-card">

              <Crown size={45} />

              <h3>

                Premium Membership

              </h3>

              <p>

                Unlock unlimited AI report analysis,
                AI Chat, appointments and advanced
                healthcare insights.

              </p>

              <button className="payment-btn">

                Upgrade Now

              </button>

            </div>

            <div className="payment-card">

              <Star size={45} />

              <h3>

                Enterprise Solution

              </h3>

              <p>

                Complete hospital management with
                doctor dashboard, analytics and
                AI-powered medical reports.

              </p>

              <button className="payment-btn">

                Contact Sales

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="faq-section">

        <div className="container">

          <div className="section-title">

            <h2>

              Frequently Asked Questions

            </h2>

          </div>

          <div className="faq-grid">

            <div className="faq-card">

              <h3>

                Can I use MediMind AI for free?

              </h3>

              <p>

                Yes. Every user receives a free plan
                with limited AI report analysis.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Which payment gateway is supported?

              </h3>

              <p>

                Razorpay integration can be added for
                Indian users and Stripe for
                international payments.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Can I cancel anytime?

              </h3>

              <p>

                Yes. You can cancel your subscription
                whenever you want.

              </p>

            </div>

            <div className="faq-card">

              <h3>

                Is my medical data secure?

              </h3>

              <p>

                Yes. JWT Authentication, encrypted
                storage and secure cloud services
                protect your medical reports.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="pricing-cta">

        <div className="container">

          <h2>

            Ready to Upgrade?

          </h2>

          <p>

            Join thousands of patients using
            AI-powered healthcare every day.

          </p>

          <button className="pricing-btn">

            Get Started

            <ArrowRight size={18}/>

          </button>

        </div>

      </section>

      <Footer/>

    </>

  );

};

export default Pricing;