import './Hero.css';

// Full implementation in Part 4
export default function Hero() {
  return (
    <section className="hero-section section" id="home">
      <div className="container">
        <span className="section-label">Hello, World 👋</span>
        <h1 className="hero-name">Nilesh Sharma</h1>
        <p className="hero-sub">Cybersecurity & Cloud Engineer</p>
        <p className="section-desc">
          Full Hero section coming in Part 4 — animations, typing effect, CV download button.
        </p>
      </div>
    </section>
  );
}
