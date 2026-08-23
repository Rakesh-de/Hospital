import "./Testimonials.css";
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
    <section className="testimonials">

      <div className="container">

        <div className="section-header">

          <span>Testimonials</span>

          <h2>Loved by Doctors & Patients</h2>

          <p>Real experiences from our healthcare community.</p>

        </div>

        <div className="testimonial-grid">

          {testimonials.map((item, index) => (

            <div
              className="testimonial-card"
              key={index}
            >

              <div className="stars">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#facc15"
                    color="#facc15"
                  />
                ))}

              </div>

              <p className="review">
                "{item.review}"
              </p>

              <div className="user">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <h3>{item.name}</h3>

                  <span>{item.role}</span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;