import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AllBlogs.css';

const AllBlogs = () => {
  const navigate = useNavigate();
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="all-blogs-page">
      <div className="all-blogs-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <span className="back-arrow">←</span>
          <span>Back to Home</span>
        </button>
        
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">All Blog Articles</h1>
          <p className="page-subtitle">
            Explore all my thoughts, tutorials, and stories from my journey in tech and creativity.
          </p>
        </motion.div>
      </div>

      {loading ? (
        <div className="all-blogs-loading">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="no-blogs-message">
          <p>No blogs available yet. Check back soon!</p>
        </div>
      ) : (
        <motion.div 
          className="all-blogs-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="all-blogs-grid">
            {blogs.map((blog) => (
              <motion.article
                key={blog._id}
                className="all-blog-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <div className="all-blog-header">
                  <span className="all-blog-category">{blog.category}</span>
                  <span className="all-blog-date">{formatDate(blog.createdAt)}</span>
                </div>
                
                <h3 className="all-blog-title">{blog.title}</h3>
                <p className="all-blog-excerpt">{blog.excerpt}</p>
                
                <div className="all-blog-tags">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="all-blog-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="all-blog-footer">
                  <span className="all-read-time">{blog.readTime}</span>
                  <button className="all-read-more-btn">
                    Read More
                    <span className="all-btn-arrow">→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AllBlogs;
