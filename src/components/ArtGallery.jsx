import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ArtGallery.css';

const ArtGallery = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const artworks = [
    { id: 1, title: 'Digital Dreams', category: 'Digital Art', color: '#8b7355' },
    { id: 2, title: 'Abstract Thoughts', category: 'Abstract', color: '#7a5d47' },
    { id: 3, title: 'Urban Sketches', category: 'Illustration', color: '#6b5744' },
    { id: 4, title: 'Color Theory', category: 'Experimental', color: '#8b7355' },
    { id: 5, title: 'Minimalist Series', category: 'Minimalism', color: '#7a5d47' },
    { id: 6, title: 'Nature Studies', category: 'Traditional', color: '#6b5744' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section id="artgallery" className="gallery-section">
      <div className="wave-decoration">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 C300,110 400,30 600,70 C800,110 900,30 1200,70 L1200,0 L0,0 Z" />
        </svg>
      </div>
      <motion.div
        ref={ref}
        className="gallery-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >

        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">05</span>
          <h2 className="section-title">Art Gallery</h2>
          <div className="title-underline"></div>
        </motion.div>

        <motion.p className="gallery-intro" variants={itemVariants}>
          Where code meets canvas. A collection of visual explorations and creative experiments.
        </motion.p>

        <div className="gallery-grid">
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              className="artwork-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedImage(artwork)}
            >
              <div className="artwork-image" style={{ backgroundColor: artwork.color }}>
                <div className="artwork-overlay">
                  <span className="view-icon">👁</span>
                </div>
              </div>
              <div className="artwork-info">
                <h3 className="artwork-title">{artwork.title}</h3>
                <p className="artwork-category">{artwork.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="gallery-footer" variants={itemVariants}>
          <p className="footer-text">More artwork coming soon</p>
          <button className="view-more-btn">
            <span>View Full Portfolio</span>
            <span className="btn-icon">↗</span>
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
              <div className="lightbox-image" style={{ backgroundColor: selectedImage.color }}></div>
              <div className="lightbox-info">
                <h3 className="lightbox-title">{selectedImage.title}</h3>
                <p className="lightbox-category">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ArtGallery;
