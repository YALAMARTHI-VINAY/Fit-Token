import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className="logo" {...props}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        marginRight: '12px',
        boxShadow: '0 2px 8px rgba(255,107,53,0.08)'
      }}>
        FT
      </div>
      <Link to="/" style={{
        fontWeight: 800,
        fontSize: '1.75rem',
        background: 'linear-gradient(90deg, #FF6B35 0%, #FF8E53 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textDecoration: 'none',
        letterSpacing: '1px'
      }}>
        FitToken
      </Link>
    </div>
  );
};

export default Logo;
