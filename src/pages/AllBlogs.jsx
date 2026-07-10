import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AllBlogs.css';

const AllBlogs = () => {
  const navigate = useNavigate();

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

      <motion.div 
        className="all-blogs-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="all-blogs-grid">
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              className="all-blog-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="all-blog-header">
                <span className="all-blog-category">{blog.category}</span>
                <span className="all-blog-date">{blog.date}</span>
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
    </div>
  );
};

export default AllBlogs;
