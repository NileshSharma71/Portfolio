import { motion } from 'framer-motion';
import heroImg from '../../assets/hero.jpg';
import { PERSONAL } from '../../data/personal';
import './About.css';

const CERTIFICATIONS = [
  { name: 'OCI Foundations Associate', issuer: 'Oracle' },
  { name: 'DevOps on AWS', issuer: 'AWS' },
  { name: 'Cisco Networking Basics', issuer: 'Cisco' },
  { name: 'Red Hat System Admin I', issuer: 'Red Hat' },
];

const STATS = [
  { value: '1+', label: 'Months Internship' },
  { value: '3+', label: 'Projects Built' },
  { value: '4', label: 'Certifications' },
];

// Framer Motion slide-in variants
const slideLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };
const slideRight = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } };
const transition = { duration: 0.65, ease: 'easeOut' };

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">

          {/* ── Left: Photo ──────────────────────────────────────────── */}
          <motion.div
            className="about-photo-col"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <div className="photo-frame">
              {/* Background accent box — gives photo a layered feel */}
              <div className="photo-bg-box" aria-hidden="true" />
              <img
                src={heroImg}
                alt="Nilesh Sharma"
                className="about-photo"
                loading="lazy"
              />
              <a href="https://jklu.edu.in" target="_blank" rel="noopener noreferrer">
                {/* Floating accent badge */}
                <div className="photo-badge">
                  <span>🎓</span>
                  <span>B.Tech · JKLU</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ── Right: Content ───────────────────────────────────────── */}
          <motion.div
            className="about-content"
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: 0.15 }}
          >
            <span className="section-label">About Me</span>
            <h2 className="section-title">Hello, I'm Nilesh 👋</h2>

            <div className="status-chip about-status">
              <span className="status-dot" />
              Open to Opportunities
            </div>

            {/* Bio */}
            <div className="about-bio">
              <p>
                I'm a B.Tech student at <strong>JK Lakshmipat University</strong>, Jaipur —
                deeply focused on cybersecurity and cloud infrastructure. I love building things,
                and then breaking them to find vulnerabilities before others do.
              </p>
              <p>
                My experience spans <strong>AWS architecture</strong>,{' '}
                <strong>DevOps automation</strong>, and ethical hacking. As a Cloud Engineer
                Intern at <strong>CoreXtech IT Services</strong>, I built and secured AWS
                infrastructure — implementing least-privilege IAM, hardening Bastion hosts,
                and setting up monitoring pipelines.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="about-stats">
              {STATS.map(({ value, label }) => (
                <div className="stat-card" key={label}>
                  <span className="stat-num">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>

            {/* Certification Badges */}
            <div className="cert-list">
              {CERTIFICATIONS.map(({ name, issuer }) => (
                <span className="cert-badge" key={name} title={`Issued by ${issuer}`}>
                  {name}
                </span>
              ))}
            </div>

            {/* CTA Links */}
            <div className="about-ctas">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="about-github-btn"
              >
                {/* GitHub icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                id="about-linkedin-btn"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
