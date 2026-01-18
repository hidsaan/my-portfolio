import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const projects = [
    {
      id: 1,
      title: 'TechLord',
      category: 'Full Stack Web Development',
      description: 'An e-commerce platform for buying and selling tech with a holistic approach. Connect with experts, find service centers, and explore every aspect of technology using high-end secure solutions.',
      tech: ['React', 'Node.js', 'MongoDB', 'Redux'],
      color: 'rgba(139, 115, 85, 0.1)'
    },
    {
      id: 2,
      title: 'Rahvaan',
      category: 'Mobile Development',
      description: 'A comprehensive taxi service mobile app built for a client, featuring separate driver and traveller portals with in-app payments, real-time chat, and seamless booking system.',
      tech: ['Expo', 'React Native', 'Socket.io', 'Redux'],
      color: 'rgba(122, 93, 71, 0.1)'
    },
    {
      id: 3,
      title: 'ILS Imperia',
      category: 'Mobile Development',
      description: 'A tech-focused e-learning LMS built for a client, featuring comprehensive course management, in-app payment integration, and interactive learning experiences.',
      tech: ['React Native', 'Redux'],
      color: 'rgba(107, 87, 68, 0.1)'
    },
    {
      id: 4,
      title: 'ILS Plasma',
      category: 'Mobile Development',
      description: 'A React Native e-learning LMS built for in-house students of the client organization, providing tech-focused learning experiences tailored for internal training and development.',
      tech: ['React Native', 'Redux'],
      color: 'rgba(139, 115, 85, 0.1)'
    },
    {
      id: 5,
      title: 'ILS Adzura',
      category: 'Mobile Development',
      description: 'A webview application built in React Native for a client, featuring comprehensive lead management system to streamline sales processes and customer relationship management.',
      tech: ['React Native', 'WebView', 'Redux'],
      color: 'rgba(122, 93, 71, 0.1)'
    },
    {
      id: 6,
      title: 'UTF Health Desk',
      category: 'Mobile Development',
      description: 'A webview application built in React Native for a client, providing comprehensive clinic management with seamless booking and appointment scheduling capabilities.',
      tech: ['React Native', 'WebView', 'Redux'],
      color: 'rgba(107, 87, 68, 0.1)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="wave-top">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 L1200,0 L0,0 Z" />
        </svg>
      </div>
      <div className="wave-bottom">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,50 C200,0 400,100 600,50 C800,0 1000,100 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
      <motion.div
        ref={ref}
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">02</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-header">
                <span className="project-number">0{index + 1}</span>
                <span className="project-category">{project.category}</span>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-footer">
                <button className="project-link">
                  View Project
                  <span className="link-arrow">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="projects-cta" variants={itemVariants}>
          <p className="cta-text">Want to see more?</p>
          <button 
            className="view-all-btn"
            onClick={() => window.open('https://github.com/hidsaan', '_blank')}
          >
            <span>Visit my GitHub</span>
            <span className="btn-icon">↗</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
