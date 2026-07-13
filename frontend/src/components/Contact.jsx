import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-slate-900">
            Contact Us
          </h2>

          <p className="text-slate-600 mt-4">
            We'd love to hear from you.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}

          <div className="space-y-8">

            <div className="flex gap-4">

              <div className="bg-blue-100 p-4 rounded-xl">

                <Phone className="text-blue-600"/>

              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Phone
                </h3>

                <p className="text-slate-600">
                  +91 9876543210
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="bg-blue-100 p-4 rounded-xl">

                <Mail className="text-blue-600"/>

              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Email
                </h3>

                <p className="text-slate-600">
                  support@medimind.ai
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="bg-blue-100 p-4 rounded-xl">

                <MapPin className="text-blue-600"/>

              </div>

              <div>

                <h3 className="font-semibold text-xl">
                  Address
                </h3>

                <p className="text-slate-600">
                  Jaipur, Rajasthan, India
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <form className="bg-slate-50 rounded-3xl p-8 shadow">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-xl border mb-5 outline-none focus:border-blue-600"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-xl border mb-5 outline-none focus:border-blue-600"
            />

            <textarea
              rows="6"
              placeholder="Message"
              className="w-full p-4 rounded-xl border mb-5 outline-none focus:border-blue-600"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl w-full"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default Contact;