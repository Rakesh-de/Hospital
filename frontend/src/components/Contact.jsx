import "./Contact.css";

import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {

    return (

        <section className="contact">

            <div className="contact-container">

                <div className="contact-header">

                    <h2>Contact Us</h2>

                    <p>We'd love to hear from you.</p>

                </div>

                <div className="contact-grid">

                    {/* Left */}

                    <div className="contact-info">

                        <div className="contact-item">

                            <div className="contact-icon">

                                <Phone />

                            </div>

                            <div>

                                <h3>Phone</h3>

                                <p>+91 7231942192</p>

                            </div>

                        </div>

                        <div className="contact-item">

                            <div className="contact-icon">

                                <Mail />

                            </div>

                            <div>

                                <h3>Email</h3>

                                <p>prajapatdhiraj658@gmail.com</p>

                            </div>

                        </div>

                        <div className="contact-item">

                            <div className="contact-icon">

                                <MapPin />

                            </div>

                            <div>

                                <h3>Address</h3>

                                <p>Jaipur, Rajasthan, India</p>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <form className="contact-form">

                        <input
                            type="text"
                            placeholder="Your Name"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                        />

                        <textarea
                            rows="6"
                            placeholder="Message"
                        />

                        <button>

                            Send Message (To Rakesh)

                        </button>

                    </form>

                </div>

            </div>

        </section>

    );

};

export default Contact;