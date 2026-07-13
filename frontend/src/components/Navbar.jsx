import { Link } from "react-router-dom";
import { Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-2"
                >

                    <div className="bg-blue-600 text-white p-2 rounded-xl">

                        <Stethoscope size={24} />

                    </div>

                    <div>

                        <h1 className="text-xl font-bold text-slate-800">

                            MediMind AI

                        </h1>

                        <p className="text-xs text-slate-500">

                            Smart Healthcare

                        </p>

                    </div>

                </Link>

                {/* Desktop Menu */}

                <div className="hidden md:flex items-center gap-8">

                    <Link
                        to="/"
                        className="font-medium text-slate-700 hover:text-blue-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className="font-medium text-slate-700 hover:text-blue-600 transition"
                    >
                        About
                    </Link>

                    <Link
                        to="/features"
                        className="font-medium text-slate-700 hover:text-blue-600 transition"
                    >
                        Features
                    </Link>

                    <Link
                        to="/pricing"
                        className="font-medium text-slate-700 hover:text-blue-600 transition"
                    >
                        Pricing
                    </Link>

                    <Link
                        to="/contact"
                        className="font-medium text-slate-700 hover:text-blue-600 transition"
                    >
                        Contact
                    </Link>

                </div>

                {/* Buttons */}

                <div className="hidden md:flex gap-3">

                    <Link
                        to="/login"
                        className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50"
                    >

                        Login

                    </Link>

                    <Link
                        to="/register"
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    >

                        Register

                    </Link>

                </div>

                {/* Mobile */}

                <button

                    className="md:hidden"

                    onClick={() => setMenuOpen(!menuOpen)}

                >

                    {

                        menuOpen ?

                            <X size={28} />

                            :

                            <Menu size={28} />

                    }

                </button>

            </div>

            {

                menuOpen && (

                    <div className="md:hidden bg-white border-t">

                        <div className="flex flex-col p-5 gap-4">

                            <Link to="/" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link>

                            <Link to="/about" onClick={() => setMenuOpen(false)}>
                                About
                            </Link>

                            <Link to="/features" onClick={() => setMenuOpen(false)}>
                                Features
                            </Link>

                            <Link to="/pricing" onClick={() => setMenuOpen(false)}>
                                Pricing
                            </Link>

                            <Link to="/contact" onClick={() => setMenuOpen(false)}>
                                Contact
                            </Link>

                            <Link to="/login" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>

                            <Link to="/register" onClick={() => setMenuOpen(false)}>
                                Register
                            </Link>

                        </div>

                    </div>

                )

            }

        </nav>

    );

};

export default Navbar;