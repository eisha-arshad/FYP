import React from 'react';
import { Link } from 'react-router-dom';
import Bg1 from '../../../assets/images/bg.jpg';
import LogoImg from '../../../assets/images/logo.jpg';
import HeroVideo from '../../../assets/images/hero.mp4';
import './Landing.css';

function Landing() {
  return (
    <div id="landing">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <img src={LogoImg} alt="Header" />
          <span className="brand-text">UniSnap</span>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="btn">Login</Link>
        </nav>
      </header>

      {/* 🔥 HERO SECTION */}
      <section className="hero-section-overlay">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src={HeroVideo} type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1 className="hero-heading">Empower Your Projects <br></br> Elevate Your Future</h1>
          <p className="hero-subheading">Submit, collaborate, and succeed on one modern platform.</p>

          <div className="signup-button-row">
            <Link to="/student-agreement" className="signup-button">
              <div className="signup-icon">🎓</div>
              <span>SignUp as Student</span>
            </Link>
            <Link to="/signup/supervisor" className="signup-button">
              <div className="signup-icon">👨‍🏫</div>
              <span>SignUp as Supervisor</span>
            </Link>
            <Link to="/signup/admin" className="signup-button">
              <div className="signup-icon">🛠️</div>
              <span>SignUp as Admin</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features features-bg"
      //  style={{ backgroundImage: `url(${Bg1})` }}
        >
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <Feature icon="📁" title="Easy Submissions" desc="Upload deliverables with version control." />
          <Feature icon="🔔" title="Real-Time Alerts" desc="Never miss a submission deadline." />
          <Feature icon="💬" title="Live Feedback" desc="Get responses directly from your supervisor." />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Features</li>
              <li>Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>📍 Lahore, Pakistan</p>
            <p>📧 info@projectportal.com</p>
            <p>📞 +92-123456789</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <p>GitHub | LinkedIn | Facebook</p>
          </div>
        </div>
        <div className="legal">
          <p>© 2025 University of Lahore | Privacy Policy | Terms</p>
        </div>
      </footer>
    </div>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default Landing;



