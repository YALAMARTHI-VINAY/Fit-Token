import './Features.css';

const features = [
  {
    icon: '📊',
    title: 'Fitness Tracking',
    description: 'Sync your fitness trackers to automatically record steps, workouts, and exercise metrics.'
  },
  {
    icon: '🔒',
    title: 'Smart Contract Verification',
    description: 'Blockchain technology ensures transparent and trustworthy fitness data verification.'
  },
  {
    icon: '🪙',
    title: 'Token Rewards',
    description: 'Earn FitTokens based on predefined milestones and fitness achievements.'
  },
  {
    icon: '💱',
    title: 'Trade & Exchange',
    description: 'Use tokens for discounts on fitness gear, gym memberships, or trade them.'
  }
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '2.5M', label: 'Tokens Earned' },
  { value: '500K+', label: 'Workouts Completed' },
  { value: '98%', label: 'User Satisfaction' }
];

const Features = () => {
  return (
    <section className="features-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How FitToken <span className="highlight">Works</span></h2>
          <p className="section-subtitle">
            Join our fitness revolution and start earning cryptocurrency for your daily activities.
            It's simple, rewarding, and good for you!
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="stats-section">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
