import React from 'react';
import { Link } from 'react-router-dom';
import Bg1 from '../../../assets/images/bg.jpg';
import LogoImg from '../../../assets/images/logo.jpg';
import HeroVideo from '../../../assets/images/hero.mp4';
import styles from './Landing.module.css';

function Landing() {
  return (
    <div id="landing" className={styles.ldContainer}>
      {/* Header */}
      <header className={styles.ldNavbar}>
        <div className={styles.ldLogo}>
          <img src={LogoImg} alt="Header" />
          <span className={styles.ldBrandText}>UniSnap</span>
        </div>
        <nav className={styles.ldNavLinks}>
          <Link to="/student-dashboard">Home</Link>
          <Link to="/supervisor-dashboard">Features</Link>
          <Link to="/admin-dashboard">Contact</Link>
          <Link to="/login" className={styles.ldBtn}>Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.ldHeroSection}>
        <video className={styles.ldBgVideo} autoPlay muted loop playsInline>
          <source src={HeroVideo} type="video/mp4" />
        </video>

        <div className={styles.ldHeroContent}>
          <h1 className={styles.ldHeroHeading}>
            Empower Your Projects <br /> Elevate Your Future
          </h1>
          <p className={styles.ldHeroSubheading}>
            Submit, collaborate, and succeed on one modern platform.
          </p>

          <div className={styles.ldSignupRow}>
            <Link to="/student-agreement" className={styles.ldSignupBtn}>
              <div className={styles.ldSignupIcon}>🎓</div>
              <span>SignUp as Student</span>
            </Link>
            <Link to="/signup/supervisor" className={styles.ldSignupBtn}>
              <div className={styles.ldSignupIcon}>👨‍🏫</div>
              <span>SignUp as Supervisor</span>
            </Link>
            <Link to="/signup/admin" className={styles.ldSignupBtn}>
              <div className={styles.ldSignupIcon}>🛠️</div>
              <span>SignUp as Admin</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.ldFeatures} >
        {/* style={{ backgroundImage: `url(${Bg1})` }} */}
        <h2>Why Choose Us?</h2>
        <div className={styles.ldFeatureGrid}>
          <Feature icon="📁" title="Easy Submissions" desc="Upload deliverables with version control." />
          <Feature icon="🔔" title="Real-Time Alerts" desc="Never miss a submission deadline." />
          <Feature icon="💬" title="Live Feedback" desc="Get responses directly from your supervisor." />
        </div>
      </section>

      
      {/* New Section: Workflow Overview */}
      <section className={styles.ldFlow}>
        <div className={styles.ldFlowGrid}>
          <div className={styles.ldFlowText}>
            <h2>📌 How It Works</h2>
            <p>
              Submit your proposals, track your deadlines, and get feedback – all
              in one dashboard. Supervisors review. Admins oversee. You stay focused.
            </p>
            <Link to="/login" className={styles.ldFlowBtn}>View Dashboard</Link>
          </div>
          <div className={styles.ldFlowCard}>
            <ul>
              <li><span>🎓</span> Student uploads project</li>
              <li><span>👨‍🏫</span> Supervisor reviews submission</li>
              <li><span>📊</span> Admin monitors deadlines</li>
            </ul>
          </div>
        </div>
      </section>

      {/* New Section: Role Spotlight */}
      <section className={styles.ldRoles}>
        <h2>Role Spotlight</h2>
        <div className={styles.ldRoleCards}>
          <Role icon="🎓" title="Students" detail="Submit projects, get feedback, and track deadlines." />
          <Role icon="👨‍🏫" title="Supervisors" detail="Review files, add feedback, and communicate progress." />
          <Role icon="🛡️" title="Admins" detail="Manage users, send updates, and monitor project health." />
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.ldFooter}>
        <div className={styles.ldFooterGrid}>
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
        <div className={styles.ldLegal}>
          <p>© 2025 University of Lahore | Privacy Policy | Terms</p>
        </div>
      </footer>
    </div>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className={styles.ldFeatureCard}>
    <div className={styles.ldIcon}>{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

const Role = ({ icon, title, detail }) => (
  <div className={styles.ldRoleCard}>
    <span className={styles.ldRoleIcon}>{icon}</span>
    <h3>{title}</h3>
    <p>{detail}</p>
  </div>
);

export default Landing;

