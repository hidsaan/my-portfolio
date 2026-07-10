import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const contactMethods = [
    { icon: <HiMail />, label: 'Email', value: 'hidsaanmajeed427226@gmail.com', link: 'mailto:hidsaanmajeed427226@gmail.com' },
    { icon: <FaLinkedin />, label: 'LinkedIn', value: 'linkedin.com/hidsaan-majeed', link: 'https://www.linkedin.com/in/hidsaan-majeed-7a0456135/' },
    { icon: <FaGithub />, label: 'GitHub', value: 'github.com/hidsaan', link: 'https://github.com/hidsaan' },
    { icon: <FaInstagram />, label: 'Instagram', value: 'instagram.com/justajourney', link: 'https://www.instagram.com/justajourn.ey/' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            
            <div className="modal-header">
              <p className="modal-subtitle">Let's discuss your project and bring your vision to life</p>
            </div>

            <div className="modal-body">
              <div className="modal-contact-methods">
                {contactMethods.map((method, index) => (
                  <a key={index} href={method.link} className="modal-contact-method" target="_blank" rel="noopener noreferrer">
                    <span className="modal-method-icon">{method.icon}</span>
                    <div className="modal-method-info">
                      <span className="modal-method-label">{method.label}</span>
                      <span className="modal-method-value">{method.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-form-group">
                  <label htmlFor="modal-name" className="modal-form-label">Name *</label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="modal-form-input"
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="modal-email" className="modal-form-label">Email *</label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="modal-form-input"
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="modal-company" className="modal-form-label">Company</label>
                  <input
                    type="text"
                    id="modal-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="modal-form-input"
                    placeholder="Optional"
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="modal-message" className="modal-form-label">Message *</label>
                  <textarea
                    id="modal-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="modal-form-textarea"
                    rows="4"
                    required
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button type="submit" className="modal-submit-btn">
                  <span>Send Message</span>
                  <span className="modal-btn-arrow">→</span>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
