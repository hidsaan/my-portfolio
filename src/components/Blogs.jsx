import React, { useState, useRef, useEffect } from 'react';
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
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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

        {loading ? (
          <div className="blogs-loading">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="no-blogs-message">
            <p>No blogs available yet. Check back soon!</p>
          </div>
        ) : (
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
                key={blog._id}
                className="blog-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <div className="blog-header">
                  <span className="blog-category">{blog.category}</span>
                  <span className="blog-date">{formatDate(blog.createdAt)}</span>
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
        )}

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
