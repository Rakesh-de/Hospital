import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "MediMind AI has reduced my report analysis time significantly. The AI summaries are incredibly helpful before consultations.",
  },
  {
    name: "Rakesh Sharma",
    role: "Patient",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Uploading my reports and receiving AI-generated explanations made understanding my health much easier.",
  },
  {
    name: "Dr. Emily Davis",
    role: "Radiologist",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The clean UI, secure records, and AI assistance make this an outstanding healthcare platform.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold mt-4 text-slate-900">
            Loved by Doctors & Patients
          </h2>

          <p className="mt-4 text-slate-600">
            Real experiences from our healthcare community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition"
            >
              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#FACC15"
                    color="#FACC15"
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-7">
                "{item.review}"
              </p>

              <div className="flex items-center mt-8">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="ml-4">

                  <h3 className="font-semibold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>

                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;