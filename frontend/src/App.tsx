import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Nutrition from './components/Nutrition/Nutrition';
import Features from './components/Features/Features';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header isScrolled={isScrolled} />
        <main>
          <Hero />
          <Features />
          <Nutrition />
          <CTA />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
