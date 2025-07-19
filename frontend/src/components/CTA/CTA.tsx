import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Start Your Fitness Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of users who are already earning cryptocurrency while staying healthy. 
            Download the app and start earning FitTokens today!
          </p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">
              <i className="fas fa-download"></i>
              Download App
            </a>
            <a href="#" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
