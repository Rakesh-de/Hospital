import { Link } from "react-router-dom";
import { Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link to="/" className="logo">

          <div className="logo-icon">
            <Stethoscope size={24} />
          </div>

          <div>

            <h2>MediMind AI</h2>

            <p>Smart Healthcare</p>

          </div>

        </Link>

        {/* Desktop Menu */}

        <div className="nav-links">

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* Buttons */}

        <div className="nav-buttons">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>

        </div>

        {/* Mobile */}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <X size={28}/> : <Menu size={28}/>}

        </button>

      </div>

      {menuOpen && (

        <div className="mobile-menu">

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

          <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>

          <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>

        </div>

      )}

    </nav>

  );

};

export default Navbar;