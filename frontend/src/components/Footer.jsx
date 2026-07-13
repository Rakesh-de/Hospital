import { HeartPulse } from "lucide-react";

const Footer = () => {

  return (

    <footer className="bg-slate-900 text-white pt-20 pb-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <div className="flex items-center gap-3">

              <HeartPulse
                className="text-blue-400"
                size={32}
              />

              <h2 className="text-2xl font-bold">
                MediMind AI
              </h2>

            </div>

            <p className="mt-5 text-slate-400">

              AI Powered Healthcare Platform for smarter diagnosis,
              appointments and medical report analysis.

            </p>

          </div>

          <div>

            <h3 className="font-semibold mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>About</li>

              <li>Careers</li>

              <li>Blog</li>

            </ul>

          </div>

          <div>

            <h3 className="font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>Documentation</li>

              <li>Support</li>

              <li>Privacy Policy</li>

            </ul>

          </div>

          <div>

            <h3 className="font-semibold mb-5">
              Contact
            </h3>

            <p className="text-slate-400">

              support@medimind.ai

            </p>

            <p className="text-slate-400 mt-2">

              +91 9876543210

            </p>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-500">

          © 2026 MediMind AI. All Rights Reserved.

        </div>

      </div>

    </footer>

  );

};

export default Footer;