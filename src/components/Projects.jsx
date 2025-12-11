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
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A full-featured online shopping platform with real-time inventory management and secure payment integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: 'rgba(139, 115, 85, 0.1)'
    },
    {
      id: 2,
      title: 'Fitness Tracking App',
      category: 'Mobile Development',
      description: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features.',
      tech: ['React Native', 'Firebase', 'Redux'],
      color: 'rgba(122, 93, 71, 0.1)'
    },
    {
      id: 3,
      title: 'Portfolio CMS',
      category: 'Full Stack',
      description: 'Content management system for creative professionals to showcase their work with customizable themes.',
      tech: ['Next.js', 'PostgreSQL', 'Tailwind'],
      color: 'rgba(107, 87, 68, 0.1)'
    },
    {
      id: 4,
      title: 'Real-Time Chat',
      category: 'Web Development',
      description: 'Instant messaging platform with end-to-end encryption, file sharing, and video call capabilities.',
      tech: ['Socket.io', 'Express', 'WebRTC'],
      color: 'rgba(139, 115, 85, 0.1)'
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
          <button className="view-all-btn">
            <span>View All Projects</span>
            <span className="btn-icon">↗</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
