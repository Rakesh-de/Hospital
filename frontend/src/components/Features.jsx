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
    <section
      id="features"
      className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            FEATURES
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Everything You Need
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            A complete AI-powered healthcare platform designed for patients,
            doctors and hospitals.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 hover:-translate-y-2"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">

                  <Icon
                    size={32}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-2xl font-semibold text-slate-900">

                  {item.title}

                </h3>

                <p className="mt-4 text-slate-600 leading-7">

                  {item.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
};

export default Features;