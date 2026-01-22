import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBolt, FaPalette, FaMobileAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="wave-decoration">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <motion.div
        ref={ref}
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">01</span>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-text-block" variants={itemVariants}>
            <p className="about-paragraph">
              I'm a passionate developer who believes in the intersection of functionality and aesthetics. 
              With a keen eye for design and a love for clean code, I create digital experiences that 
              not only work flawlessly but also feel intuitive and beautiful.
            </p>
            <p className="about-paragraph">
              My journey in tech began with curiosity and evolved into a dedication to crafting 
              meaningful solutions. Whether it's building responsive web applications or designing 
              mobile experiences, I approach each project with creativity and precision.
            </p>
          </motion.div>

          <motion.div className="about-highlights" variants={itemVariants}>
            <div className="highlight-card">
              <div className="highlight-icon"><FaBolt /></div>
              <h3 className="highlight-title">Fast & Efficient</h3>
              <p className="highlight-text">Optimized performance with clean, maintainable code</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon"><FaPalette /></div>
              <h3 className="highlight-title">Design Focused</h3>
              <p className="highlight-text">Pixel-perfect implementations with attention to detail</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon"><FaMobileAlt /></div>
              <h3 className="highlight-title">Responsive</h3>
              <p className="highlight-text">Seamless experiences across all devices and platforms</p>
            </div>
          </motion.div>
        </div>

        <motion.div className="about-stats" variants={itemVariants}>
          {/* <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div> */}
          {/* <div className="stat-divider"></div> */}
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Ideas Brewing</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
