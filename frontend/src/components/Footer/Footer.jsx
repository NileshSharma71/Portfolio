import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Nilesh Sharma. Built with React + Node.js.
        </p>
      </div>
    </footer>
  );
}
