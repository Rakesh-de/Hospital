import "./Pricing.css";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Free",
    price: "₹0",
    features: [
      "AI Chat",
      "Medical Report Upload",
      "Basic Dashboard",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    title: "Pro",
    price: "₹499/mo",
    features: [
      "Unlimited AI Analysis",
      "Doctor Consultation",
      "Appointments",
      "Priority Support",
    ],
    button: "Choose Pro",
    highlight: true,
  },
  {
    title: "Hospital",
    price: "Custom",
    features: [
      "Multi Doctor Access",
      "Admin Dashboard",
      "Analytics",
      "API Integration",
    ],
    button: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className="pricing">

      <div className="pricing-container">

        <div className="pricing-header">

          <h2>Pricing Plans</h2>

          <p>Choose the plan that fits your needs.</p>

        </div>

        <div className="pricing-grid">

          {plans.map((plan, index) => (

            <div
              key={index}
              className={`pricing-card ${
                plan.highlight ? "active-plan" : ""
              }`}
            >

              <h3>{plan.title}</h3>

              <h1>{plan.price}</h1>

              <div className="pricing-features">

                {plan.features.map((feature, i) => (

                  <div
                    className="feature-item"
                    key={i}
                  >

                    <Check size={18} />

                    <span>{feature}</span>

                  </div>

                ))}

              </div>

              <button
                className={
                  plan.highlight
                    ? "active-btn"
                    : "normal-btn"
                }
              >
                {plan.button}
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Pricing;