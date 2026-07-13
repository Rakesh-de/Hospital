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
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Pricing Plans
          </h2>

          <p className="text-slate-600 mt-4">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <div
              key={index}
              className={`rounded-3xl p-8 ${
                plan.highlight
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-white"
              } shadow-lg`}
            >
              <h3 className="text-2xl font-bold">
                {plan.title}
              </h3>

              <h1 className="text-5xl font-bold mt-6">
                {plan.price}
              </h1>

              <div className="mt-8 space-y-4">

                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">

                    <Check size={18} />

                    <span>{feature}</span>

                  </div>
                ))}

              </div>

              <button
                className={`mt-10 w-full py-3 rounded-xl font-semibold ${
                  plan.highlight
                    ? "bg-white text-blue-600"
                    : "bg-blue-600 text-white"
                }`}
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