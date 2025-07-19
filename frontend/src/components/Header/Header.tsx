import React, { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const { user, connectWallet, disconnect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to section by id
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignIn = async () => {
    await connectWallet();
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleSignOut = () => {
    disconnect();
    setShowLanding(true);
    setTimeout(() => setShowLanding(false), 3000); // Hide landing after 3s
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar">
        <Logo onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }} />
        
        <div className="nav-actions">
          {!user.isConnected && (
            <>
              <button className="btn btn-outline" onClick={handleSignIn}>Sign In</button>
              <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
            </>
          )}
          {user.isConnected && (
            <button className="btn btn-outline" onClick={handleSignOut}>Sign Out</button>
          )}
        </div>
      </div>
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <h2>Sign Up</h2>
          <p>Choose a wallet to sign up:</p>
          <button className="btn btn-primary" onClick={async () => { await connectWallet(); setShowSignUpModal(false); }}>Sign up with MetaMask</button>
          {/* Add more wallet options here if needed */}
        </Modal>
      )}
      {showLanding && (
        <div className="signout-landing">You have signed out. See you soon!</div>
      )}
    </header>
  );
};

export default Header;
