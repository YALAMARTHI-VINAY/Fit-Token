import React from 'react';
import './Nutrition.css';

const nutritionData = [
  { name: 'Calories', current: 1800, target: 2400, color: '#FF6B35' },
  { name: 'Protein', current: 120, target: 150, color: '#4CAF50' },
  { name: 'Water', current: 5, target: 8, color: '#4299E1' }
];

const Nutrition = () => {
  return (
    <section className="nutrition-section">
      <div className="container">
        <div className="nutrition-content">
          <div className="nutrition-text">
            <h2>Fuel Your Fitness with <span className="highlight">Smart Nutrition</span></h2>
            <p className="section-subtitle">
              Track your meals, monitor your macros, and earn rewards for maintaining a balanced diet. 
              Our AI-powered nutrition assistant helps you make better food choices.
            </p>
            
            <div className="nutrition-features">
              <div className="feature-item">
                <div className="feature-icon">🍎</div>
                <div>
                  <h3>Nutrition Tracking</h3>
                  <p>Log your meals and track your daily nutrient intake with our easy-to-use food diary.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🥗</div>
                <div>
                  <h3>Meal Planning</h3>
                  <p>Get personalized meal plans based on your fitness goals and dietary preferences.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <div>
                  <h3>Diet Challenges</h3>
                  <p>Participate in challenges and earn extra tokens for healthy eating habits.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🎁</div>
                <div>
                  <h3>Healthy Rewards</h3>
                  <p>Earn FitTokens for hitting your nutrition goals and maintaining consistency.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="nutrition-card">
            <div className="card-header">
              <h3>Today's Nutrition</h3>
              <span className="token-badge">+8 Tokens</span>
            </div>
            
            <div className="nutrition-progress">
              {nutritionData.map((item, index) => (
                <div key={index} className="progress-item">
                  <div className="progress-header">
                    <span className="progress-label">{item.name}</span>
                    <span className="progress-value">
                      {item.name === 'Water' ? 
                        `${item.current} / ${item.target} glasses` : 
                        item.name === 'Protein' ? 
                        `${item.current}g / ${item.target}g` : 
                        `${item.current} / ${item.target} cal`
                      }
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{
                        width: `${(item.current / item.target) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="nutrition-feedback">
              <div className="feedback-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="feedback-text">
                <p className="feedback-message">Great job! You've hit your protein goal for today.</p>
                <p className="feedback-subtext">Keep it up to earn more tokens!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nutrition;
