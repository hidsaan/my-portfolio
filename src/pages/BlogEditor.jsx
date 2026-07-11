import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import './BlogEditor.css';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    readTime: '',
    tags: '',
    published: true
  });

  const fetchBlogData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
      if (response.ok) {
        const blog = await response.json();
        setFormData({
          title: blog.title,
          category: blog.category,
          excerpt: blog.excerpt,
          content: blog.content,
          readTime: blog.readTime,
          tags: blog.tags.join(', '),
          published: blog.published
        });
      } else {
        setError('Failed to load blog data');
      }
    } catch (err) {
      setError('Error fetching blog data');
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/me');
      return;
    }

    // If editing, fetch blog data
    if (id) {
      fetchBlogData();
    }
  }, [id, navigate, fetchBlogData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleSubmit = async (e, publishStatus = null) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/me');
      return;
    }

    // Prepare data - use publishStatus if provided, otherwise use formData.published
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: formData.readTime.trim() || calculateReadTime(formData.content),
      published: publishStatus !== null ? publishStatus : formData.published,
      archived: false // Always set archived to false when creating/editing
    };

    try {
      const url = id 
        ? `http://localhost:5000/api/blogs/${id}`
        : 'http://localhost:5000/api/blogs';
      
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
      });

      if (response.ok) {
        await response.json();
        const action = id ? 'updated' : 'created';
        const status = blogData.published ? 'published' : 'saved as draft';
        setSuccess(`Blog ${action} and ${status} successfully!`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        const data = await response.json();
        const errorMessage = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || 'Failed to save blog';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      setError(`Error saving blog: ${err.message || 'Network error. Check if backend is running.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = (e) => {
    handleSubmit(e, false);
  };

  const handlePublish = (e) => {
    handleSubmit(e, true);
  };

  const autoCalculateReadTime = () => {
    if (formData.content) {
      const readTime = calculateReadTime(formData.content);
      setFormData(prev => ({ ...prev, readTime }));
    }
  };

  return (
    <div className="blog-editor-container">
      <div className="editor-header">
        <Link to="/dashboard" className="back-link">
          <FiArrowLeft />
        </Link>
        <h1>{id ? 'Edit Blog' : 'Create New Blog'}</h1>
      </div>

      <div className="editor-content">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter blog title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="e.g., Web Development"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Brief description for the blog card"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="15"
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="readTime">Read Time</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g., 8 min read"
                />
                <button 
                  type="button" 
                  className="calc-btn"
                  onClick={autoCalculateReadTime}
                >
                  Auto Calculate
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, JavaScript, UI/UX (comma separated)"
              />
            </div>
          </div>

          {/* <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span>Publish immediately (uncheck to save as draft)</span>
            </label>
          </div> */}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="draft-btn"
              onClick={handleSaveAsDraft}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              onClick={handlePublish}
              disabled={loading}
            >
              <FiSave />
              {loading ? 'Publishing...' : (id ? 'Update & Publish' : 'Publish Blog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
