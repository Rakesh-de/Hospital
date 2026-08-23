import "./Footer.css";
import { HeartPulse } from "lucide-react";

const Footer = () => {

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-grid">

                    <div>

                        <div className="footer-logo">

                            <div className="footer-icon">

                                <HeartPulse size={28} />

                            </div>

                            <h2>MediMind AI</h2>

                        </div>

                        <p className="footer-desc">

                            AI Powered Healthcare Platform for smarter
                            diagnosis, appointments and medical report
                            analysis.

                        </p>

                    </div>

                    <div>

                        <h3>Company</h3>

                        <ul>

                            <li>About</li>

                            <li>Careers</li>

                            <li>Blog</li>

                        </ul>

                    </div>

                    <div>

                        <h3>Resources</h3>

                        <ul>

                            <li>Documentation</li>

                            <li>Support</li>

                            <li>Privacy Policy</li>

                        </ul>

                    </div>

                    <div>

                        <h3>Contact</h3>

                        <p>prajapatdhiraj658@gmail.com</p>

                        <p>+91 7131942192</p>

                    </div>

                </div>

                <div className="footer-bottom">

                    © 2026 MediMind AI. All Rights Reserved.

                </div>

            </div>

        </footer>

    );

};

export default Footer;