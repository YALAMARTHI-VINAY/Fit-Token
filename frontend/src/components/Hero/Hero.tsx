import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import googleAIStudioPhoto from '../../assets/images/Google_AI_Studio_final photo.png';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Earn Crypto by <span className="highlight">Staying Fit</span>
          </h1>
          
          <p>
            FitToken revolutionizes fitness motivation by rewarding your healthy lifestyle with cryptocurrency. 
            Sync your fitness tracker, complete milestones, and earn tokens you can trade or spend.
          </p>
          
          <div className="hero-buttons">
            <Link 
              to="#"
              className="btn btn-outline"
              onClick={e => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              How It Works
            </Link>
            <Link 
              to="/auth?mode=signup"
              className="btn btn-primary flex items-center gap-2"
            >
              <span>Start Earning Tokens</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="h-8 w-8 rounded-full bg-orange-100 border-2 border-white"
                  />
                ))}
              </div>
              <span>10,000+ Active Users</span>
            </div>
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>1M+ Tokens Earned</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <img
            src={googleAIStudioPhoto}
            alt="Google AI Studio Final"
            className="hero-illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
