import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Brain, FileText } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-36 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <ShieldCheck size={18} />
            AI Powered Healthcare Platform
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Smart Healthcare
            <span className="text-blue-600"> Powered </span>
            by Artificial Intelligence
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Upload medical reports, chat with AI doctors, analyze diseases,
            book appointments and manage your complete healthcare journey.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl flex items-center gap-2 transition"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-7 py-4 rounded-xl transition">
              Watch Demo
            </button>

          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">

            <div>
              <h2 className="text-3xl font-bold text-blue-600">
                10K+
              </h2>
              <p className="text-slate-500">
                Patients
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">
                250+
              </h2>
              <p className="text-slate-500">
                Doctors
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">
                98%
              </h2>
              <p className="text-slate-500">
                Accuracy
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900"
              alt="Doctor"
              className="rounded-2xl w-full h-[450px] object-cover"
            />

          </div>

          <div className="absolute -left-8 top-12 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3">

            <Brain className="text-blue-600" />

            <div>

              <h3 className="font-semibold">
                AI Diagnosis
              </h3>

              <p className="text-sm text-slate-500">
                Disease Prediction
              </p>

            </div>

          </div>

          <div className="absolute -right-6 bottom-10 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3">

            <FileText className="text-green-600" />

            <div>

              <h3 className="font-semibold">
                Medical Reports
              </h3>

              <p className="text-sm text-slate-500">
                AI Summary
              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;