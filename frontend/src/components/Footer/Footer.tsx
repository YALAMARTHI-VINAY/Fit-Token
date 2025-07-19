import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="support">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">FitToken</h3>
            <p className="footer-description">
              Revolutionizing fitness motivation through blockchain technology and cryptocurrency rewards.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Telegram">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" aria-label="Discord">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">How it Works</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Download</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Health & Fitness</h4>
              <ul>
                <li><a href="#">Nutrition Guide</a></li>
                <li><a href="#">Workout Plans</a></li>
                <li><a href="#">Challenges</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} FitToken. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="divider">•</span>
            <a href="#">Terms of Service</a>
            <span className="divider">•</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
