import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="home-container">
      {/* Navigation */}
      <Navbar />
      
      {/* Background image with gradient fade */}
      <div className="background-image"></div>
      <div className="gradient-overlay"></div>
      
      {/* Background texture overlay */}
      <div className="texture-overlay"></div>
      
      {/* Main content */}
      <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>
        {/* Small accent line - Golden ratio positioning */}
        <div className="accent-line"></div>
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="name-container">
            <h1 className="name-text">
              <span className="first-name">Hidsaan</span>
              <span className="last-name">Majeed</span>
            </h1>
          </div>
          
          <div className="title-container">
            <p className="title-text">Frontend Developer</p>
            <span className="divider">|</span>
            <p className="title-text">Mobile App Developer</p>
            <span className="divider">|</span>
            <p className="title-text">Artist</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="intro-section">
          <div className="intro-content">
            <p className="intro-text">
              Crafting digital experiences where code meets creativity.
              Every pixel tells a story, every interaction feels intentional.
            </p>
          </div>
        </section>

        {/* Decorative elements */}
        <div className="geometric-accent accent-1"></div>
        <div className="geometric-accent accent-2"></div>
        
        {/* Call to action */}
        <section className="cta-section">
          <button className="explore-btn">
            <span className="btn-text">Explore My Work</span>
            <span className="btn-arrow">→</span>
          </button>
        </section>

        {/* Footer note */}
        <div className="footer-note">
          <p>Scroll to discover</p>
          <div className="scroll-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
