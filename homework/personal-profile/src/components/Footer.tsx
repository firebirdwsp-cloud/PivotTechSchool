function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Light in Progress Studios</h3>

        <p>
          Color, creativity, and code — created by Jon Adam Gilliam.
        </p>

        <div className="footer-links">
          <a href="https://www.instagram.com/lipstudioart" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <a href="https://www.facebook.com/lipstudio
          " target="_blank" rel="noreferrer">
            Facebook
          </a>

        
        </div>

        <p className="copyright">
          © {currentYear} Jon Adam Gilliam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;