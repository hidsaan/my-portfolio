import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'hello@hidsaan.dev', link: 'mailto:hello@hidsaan.dev' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/hidsaan', link: '#' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/hidsaan', link: '#' },
    { icon: '🎨', label: 'Dribbble', value: 'dribbble.com/hidsaan', link: '#' }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="wave-top">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C250,100 350,20 600,60 C850,100 950,20 1200,60 L1200,0 L0,0 Z" />
        </svg>
      </div>
      <div className="wave-bottom">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C250,20 350,100 600,60 C850,20 950,100 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
      <motion.div
        ref={ref}
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">04</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-underline"></div>
        </motion.div>

        <motion.p className="contact-intro" variants={itemVariants}>
          Have a project in mind or just want to chat? I'd love to hear from you.
        </motion.p>

        <div className="contact-content">
          <motion.div className="contact-methods" variants={itemVariants}>
            {contactMethods.map((method, index) => (
              <a key={index} href={method.link} className="contact-method">
                <span className="method-icon">{method.icon}</span>
                <div className="method-info">
                  <span className="method-label">{method.label}</span>
                  <span className="method-value">{method.value}</span>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form className="contact-form" onSubmit={handleSubmit} variants={itemVariants}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              <span>Send Message</span>
              <span className="btn-arrow">→</span>
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
