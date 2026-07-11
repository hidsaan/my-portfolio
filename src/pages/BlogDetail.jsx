import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-error">
        <h2>Oops!</h2>
        <p>{error || 'Blog not found'}</p>
        <button onClick={() => navigate('/blogs')} className="back-btn">
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <motion.div 
        className="blog-detail-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header Navigation */}
        <div className="blog-detail-nav">
          <button onClick={() => navigate(-1)} className="back-button">
            <span className="back-arrow">←</span>
            <span>Back</span>
          </button>
          <button onClick={() => navigate('/')} className="home-button">
            Home
          </button>
        </div>

        {/* Paper Container */}
        <article className="blog-paper">
          {/* Blog Header */}
          <header className="blog-detail-header">
            <div className="blog-meta-row">
              <span className="blog-detail-category">{blog.category}</span>
              <span className="blog-detail-date">{formatDate(blog.createdAt)}</span>
            </div>
            
            <h1 className="blog-detail-title">{blog.title}</h1>
            
            <p className="blog-detail-excerpt">{blog.excerpt}</p>
            
            <div className="blog-detail-info">
              <span className="blog-detail-read-time">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {blog.readTime}
              </span>
              <div className="blog-detail-tags">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="detail-tag">#{tag}</span>
                ))}
              </div>
            </div>
          </header>

          {/* Decorative Divider */}
          <div className="blog-divider">
            <div className="divider-ornament">❦</div>
          </div>

          {/* Blog Content */}
          <div 
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Signature */}
          <div className="blog-signature">
            <div className="signature-divider"></div>
            <img 
              src="/signature.png" 
              alt="Signature" 
              className="signature-image"
            />
          </div>
        </article>

        {/* Footer Navigation */}
        <div className="blog-detail-footer">
          <button 
            onClick={() => navigate('/blogs')} 
            className="view-more-blogs-btn"
          >
            <span>View More Articles</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetail;
