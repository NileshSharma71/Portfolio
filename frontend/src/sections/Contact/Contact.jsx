import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PERSONAL } from '../../data/personal';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Contact info items shown on the left panel
const CONTACT_ITEMS = [
  {
    icon: '📧',
    label: 'Email',
    value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
  },
  {
    icon: '📍',
    label: 'Location',
    value: PERSONAL.location,
    href: null,
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/nilesh-sharma',
    href: PERSONAL.linkedin,
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/NileshSharma71',
    href: PERSONAL.github,
  },
];

const INITIAL_FORM = { name: '', email: '', message: '' };

// ─── Contact Section ───────────────────────────────────────────────────────────

export default function Contact() {
  const [form,    setForm]    = useState(INITIAL_FORM);
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error state as user types
    if (status === 'error') setStatus('idle');
  };

  // ─── handleSubmit — The core async I/O + REST API operation ──────────────
  //
  // ASYNC I/O:  `await axios.post(...)` is non-blocking. While waiting for the
  //             Express server to validate input and write to MongoDB, the React
  //             UI remains interactive (shows spinner, doesn't freeze).
  //
  // REST API:   POST /api/contact with JSON body → Express validates → Mongoose
  //             saves to MongoDB → returns 201 Created with a success message.
  //
  // ERROR HANDLING: 400 (validation), 429 (rate limit), 500 (server error).

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation — quick check before hitting the network
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setFeedbackMsg('Please fill in all fields before sending.');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setFeedbackMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      // Async REST API call → POST /api/contact
      const res = await axios.post(`${API_URL}/api/contact`, {
        name:    form.name.trim(),
        email:   form.email.trim(),
        message: form.message.trim(),
      });

      setStatus('success');
      setFeedbackMsg(res.data.message || "Message received! I'll get back to you soon. 🙌");
      setForm(INITIAL_FORM); // Clear form on success

    } catch (err) {
      setStatus('error');

      if (err.response?.status === 429) {
        setFeedbackMsg('Too many messages. Development rate limit active (10s).');
      } else if (err.response?.data?.message) {
        setFeedbackMsg(err.response.data.message);
      } else if (err.code === 'ERR_NETWORK') {
        setFeedbackMsg('Could not reach the server. Please email me directly instead.');
      } else {
        setFeedbackMsg('Something went wrong. Please try again or email me directly.');
      }
    }
  };

  const isLoading = status === 'loading';

  return (
    <section className="section contact-section" id="contact">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-desc">
            Open to opportunities, collaborations, or just a good conversation about security &amp; cloud.
          </p>
        </motion.div>

        <div className="contact-grid">

          {/* ── Left: Info Panel ────────────────────────────────────── */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h3 className="contact-info-title">Get In Touch</h3>
            <p className="contact-info-desc">
              I'm currently open to new opportunities — internships, full-time roles,
              or freelance security & cloud projects.
            </p>

            <div className="contact-items">
              {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
                <div key={label} className="contact-item">
                  <span className="contact-icon-box" aria-hidden="true">{icon}</span>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('mailto') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="contact-item-value contact-link"
                        id={`contact-${label.toLowerCase()}-link`}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="contact-item-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ──────────────────────────────────────────── */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          >
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              id="contact-form"
              aria-label="Contact form"
            >
              {/* Name + Email row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="form-input"
                    disabled={isLoading}
                    maxLength={100}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="form-input"
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Message textarea */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or project..."
                  className="form-input form-textarea"
                  rows={5}
                  disabled={isLoading}
                  maxLength={1000}
                  required
                />
                <span className={`char-count ${form.message.length > 900 ? 'char-warn' : ''}`}>
                  {form.message.length} / 1000
                </span>
              </div>

              {/* Success / Error feedback */}
              {(status === 'success' || status === 'error') && (
                <motion.div
                  className={`form-feedback form-${status}`}
                  role="alert"
                  aria-live="polite"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span aria-hidden="true">{status === 'success' ? '✅' : '⚠️'}</span>
                  <span>{feedbackMsg}</span>
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={isLoading || status === 'success'}
                id="contact-submit-btn"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>✅ Message Sent!</>
                ) : (
                  <>
                    Send Message
                    {/* Paper plane icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              <p className="form-note">
                Messages are stored securely. I typically respond within 24 hours.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
