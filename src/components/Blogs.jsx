import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Blogs.css';

const Blogs = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const blogs = [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      category: 'Web Development',
      date: 'March 15, 2024',
      excerpt: 'Exploring best practices and patterns for building maintainable and scalable React applications with modern tools and techniques.',
      readTime: '8 min read',
      tags: ['React', 'Architecture', 'Best Practices']
    },
    {
      id: 2,
      title: 'The Art of Mobile-First Design',
      category: 'UI/UX Design',
      date: 'February 28, 2024',
      excerpt: 'A comprehensive guide to designing beautiful and functional mobile experiences that prioritize user needs and accessibility.',
      readTime: '6 min read',
      tags: ['Mobile', 'Design', 'UX']
    },
    {
      id: 3,
      title: 'Mastering State Management in React Native',
      category: 'Mobile Development',
      date: 'February 10, 2024',
      excerpt: 'Deep dive into various state management solutions for React Native apps, comparing Redux, Context API, and modern alternatives.',
      readTime: '10 min read',
      tags: ['React Native', 'Redux', 'State Management']
    },
    {
      id: 4,
      title: 'Creative Coding: Where Art Meets Technology',
      category: 'Creative Development',
      date: 'January 22, 2024',
      excerpt: 'Exploring the intersection of programming and visual arts, using code as a medium for creative expression and digital art.',
      readTime: '7 min read',
      tags: ['Creative Coding', 'Art', 'JavaScript']
    },
    {
      id: 5,
      title: 'Building Real-Time Features with Socket.io',
      category: 'Backend Development',
      date: 'January 5, 2024',
      excerpt: 'Learn how to implement real-time chat, notifications, and live updates in your applications using Socket.io and Node.js.',
      readTime: '9 min read',
      tags: ['Socket.io', 'Node.js', 'Real-time']
    },
    {
      id: 6,
      title: 'Performance Optimization Tips for Web Apps',
      category: 'Web Development',
      date: 'December 18, 2023',
      excerpt: 'Practical techniques and tools to optimize your web applications for better performance, faster load times, and improved user experience.',
      readTime: '8 min read',
      tags: ['Performance', 'Optimization', 'Web']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
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

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.blog-card').offsetWidth;
      const gap = 30; // matches the gap in CSS
      const scrollAmount = cardWidth + gap;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScrollUpdate = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const isAtStart = scrollPosition <= 10;
  const isAtEnd = scrollContainerRef.current 
    ? scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : false;

  return (
    <section id="blogs" className="blogs-section">
      <div className="wave-decoration-top">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,70 C300,110 400,30 600,70 C800,110 900,30 1200,70 L1200,0 L0,0 Z" />
        </svg>
      </div>
      <motion.div
        ref={ref}
        className="blogs-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-number">04</span>
          <h2 className="section-title">Blog & Insights</h2>
          <div className="title-underline"></div>
        </motion.div>

        <motion.p className="blogs-intro" variants={itemVariants}>
          Thoughts, tutorials, and stories from my journey in tech and creativity.
        </motion.p>

        <div className="carousel-wrapper">
          {!isAtStart && (
            <button 
              className="carousel-arrow carousel-arrow-left"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}
          
          <div 
            className="blogs-carousel" 
            ref={scrollContainerRef}
            onScroll={handleScrollUpdate}
          >
            {blogs.map((blog) => (
              <motion.article
                key={blog.id}
                className="blog-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="blog-header">
                  <span className="blog-category">{blog.category}</span>
                  <span className="blog-date">{blog.date}</span>
                </div>
                
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                
                <div className="blog-tags">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="blog-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="blog-footer">
                  <span className="read-time">{blog.readTime}</span>
                  <button className="read-more-btn">
                    Read More
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {!isAtEnd && (
            <button 
              className="carousel-arrow carousel-arrow-right"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
        </div>

        <motion.div className="blogs-cta" variants={itemVariants}>
          <p className="cta-text">More articles coming soon</p>
          <button 
            className="view-all-blogs-btn"
            onClick={() => navigate('/blogs')}
          >
            <span>View All Articles</span>
            <span className="btn-icon">↗</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blogs;
