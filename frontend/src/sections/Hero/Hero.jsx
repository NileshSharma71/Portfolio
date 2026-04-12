import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL, ROLES } from '../../data/personal';
import './Hero.css';

// ─── Framer Motion Variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Typing Effect Hook ────────────────────────────────────────────────────────
function useTypingEffect(words) {
  const [index,       setIndex]       = useState(0);
  const [displayed,   setDisplayed]   = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);

  useEffect(() => {
    const current = words[index];
    const speed   = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, index, words]);

  return displayed;
}

// ─── Hero Component ────────────────────────────────────────────────────────────

export default function Hero() {
  const typedRole = useTypingEffect(ROLES);

  // CV download dropdown state
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCvDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // CV download — calls the backend REST API to stream the file
  const handleDownloadCV = (format) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.open(`${apiUrl}/api/cv/download/${format}`, '_blank');
    setCvDropdownOpen(false);
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="home" aria-label="Introduction">

      {/* Subtle dot-grid background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Status chip */}
          <motion.div variants={itemVariants}>
            <div className="status-chip">
              <span className="status-dot" />
              Open to Opportunities
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={itemVariants} className="hero-greeting">
            Hi there, I'm
          </motion.p>

          {/* Main heading — h1 for SEO */}
          <motion.h1 variants={itemVariants} className="hero-name">
            {PERSONAL.firstName}
            <br />
            <span className="hero-name-last">{PERSONAL.lastName}</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div variants={itemVariants} className="hero-role" aria-live="polite">
            <span className="role-prefix" aria-hidden="true">{'>'}&nbsp;</span>
            <span className="role-text">{typedRole}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="hero-tagline">
            {PERSONAL.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="hero-ctas">
            {/* ── CV Split-Button Dropdown ── */}
            <div className="cv-dropdown-wrapper" ref={dropdownRef}>
              <div className={`cv-split-btn${cvDropdownOpen ? ' open' : ''}`}>
                {/* Main label area — clicking opens the dropdown */}
                <button
                  className="cv-split-main"
                  onClick={() => setCvDropdownOpen((v) => !v)}
                  id="hero-download-cv"
                  aria-haspopup="listbox"
                  aria-expanded={cvDropdownOpen}
                  aria-label="Download CV"
                >
                  {/* Download icon */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                  {/* Chevron */}
                  <svg
                    className={`cv-chevron${cvDropdownOpen ? ' rotated' : ''}`}
                    width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Dropdown panel */}
              <AnimatePresence>
                {cvDropdownOpen && (
                  <motion.div
                    className="cv-dropdown-menu"
                    role="listbox"
                    aria-label="Choose CV format"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {/* PDF option */}
                    <button
                      className="cv-dropdown-item"
                      role="option"
                      id="cv-download-pdf"
                      onClick={() => handleDownloadCV('pdf')}
                    >
                      <span className="cv-format-badge pdf-badge">PDF</span>
                      <span className="cv-item-label">
                        <span className="cv-item-name">PDF Version</span>
                        <span className="cv-item-desc">Best for sharing &amp; viewing</span>
                      </span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cv-item-arrow" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>

                    <div className="cv-dropdown-divider" />

                    {/* DOCX option */}
                    <button
                      className="cv-dropdown-item"
                      role="option"
                      id="cv-download-docx"
                      onClick={() => handleDownloadCV('docx')}
                    >
                      <span className="cv-format-badge docx-badge">DOC</span>
                      <span className="cv-item-label">
                        <span className="cv-item-name">Word Version</span>
                        <span className="cv-item-desc">Editable .docx format</span>
                      </span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cv-item-arrow" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="btn btn-outline"
              onClick={scrollToProjects}
              id="hero-view-projects"
            >
              View Projects
              {/* Arrow icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="hero-socials">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              id="hero-github-link"
            >
              GitHub
            </a>
            <span className="social-sep" aria-hidden="true" />
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              id="hero-linkedin-link"
            >
              LinkedIn
            </a>
            <span className="social-sep" aria-hidden="true" />
            <a
              href={`mailto:${PERSONAL.email}`}
              className="social-link"
              id="hero-email-link"
            >
              Email
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="scroll-line" />
        <span className="scroll-label">scroll</span>
      </motion.div>
    </section>
  );
}
