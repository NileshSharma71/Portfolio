import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE, TYPE_COLORS } from '../../data/timeline';
import './Timeline.css';

// ─── Single Timeline Item ──────────────────────────────────────────────────────

function TimelineItem({ item, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Even index → card on LEFT, odd → card on RIGHT
  const isLeft = index % 2 === 0;
  const color  = TYPE_COLORS[item.type];

  const cardVariant = {
    hidden: { opacity: 0, x: isLeft ? -40 : 40 },
    show:   { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={ref}
      className={`tl-item ${isLeft ? 'tl-left' : 'tl-right'}`}
      aria-label={`${item.title} at ${item.organization}`}
    >
      {/* ── Card ─────────────────────────────────────────────────── */}
      <motion.div
        className="tl-card card"
        variants={cardVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
        style={{ '--tl-color': color.bg }}
      >
        {/* Type badge + period */}
        <div className="tl-meta">
          <span className="tl-badge" style={{ background: color.bg }}>
            {color.label}
          </span>
          <span className="tl-period">{item.period}</span>
          {item.current && <span className="tl-current">● Active</span>}
        </div>

        {/* Title + org */}
        <div className="tl-header">
          <span className="tl-icon" aria-hidden="true">{item.icon}</span>
          <div>
            <h3 className="tl-title">{item.title}</h3>
            <p className="tl-org">{item.organization}</p>
          </div>
        </div>

        {/* Description */}
        <p className="tl-desc">{item.description}</p>

        {/* Tags */}
        <div className="tl-tags">
          {item.tags.map((t) => (
            <span key={t} className="tag tl-tag">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* ── Centre dot ────────────────────────────────────────────── */}
      <motion.div
        className="tl-dot-col"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <div className="tl-dot" style={{ background: color.bg }}>
          <div className="tl-dot-inner" />
        </div>
      </motion.div>

      {/* ── Empty side ────────────────────────────────────────────── */}
      <div className="tl-empty" aria-hidden="true" />
    </div>
  );
}

// ─── Timeline Section ─────────────────────────────────────────────────────────

export default function Timeline() {
  return (
    <section className="section timeline-section" id="timeline">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Journey</span>
          <h2 className="section-title">Education & Experience</h2>
          <p className="section-desc">
            The path that built the skillset — from networking basics to cloud architecture.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="tl-legend" aria-label="Timeline legend">
          {Object.entries(TYPE_COLORS).map(([type, { bg, label }]) => (
            <div key={type} className="tl-legend-item">
              <span className="tl-legend-dot" style={{ background: bg }} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Timeline wrapper — contains the vertical center line */}
        <div className="tl-wrapper" role="list">
          <div className="tl-center-line" aria-hidden="true" />
          {TIMELINE.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
