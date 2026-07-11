import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiHome, FiPlus, FiEdit, FiTrash2, FiCheck, FiArchive } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('Dashboard component rendered', { loading, error, userData });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/me');
        return;
      }

      try {
        console.log('Fetching user data with token:', token.substring(0, 20) + '...');
        const response = await fetch('http://localhost:5000/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('User data received:', data);
          setUserData(data);
          await fetchBlogs(token);
        } else {
          // Token invalid or expired
          console.log('Token invalid or expired');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/me');
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchBlogs = async (token) => {
    try {
      console.log('Fetching blogs...');
      const response = await fetch('http://localhost:5000/api/blogs/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Blogs response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Blogs received:', data.length);
        setBlogs(data);
      } else {
        console.error('Failed to fetch blogs, status:', response.status);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } else {
        alert('Failed to delete blog');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting blog');
    }
  };

  const handlePublishBlog = async (blogId, currentStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(blogs.map(blog => 
          blog._id === blogId ? { ...blog, published: data.blog.published } : blog
        ));
      } else {
        alert('Failed to update blog status');
      }
    } catch (err) {
      console.error('Publish error:', err);
      alert('Error updating blog status');
    }
  };

  const handleArchiveBlog = async (blogId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}/archive`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(blogs.map(blog => 
          blog._id === blogId ? { ...blog, archived: data.blog.archived } : blog
        ));
      } else {
        alert('Failed to archive blog');
      }
    } catch (err) {
      console.error('Archive error:', err);
      alert('Error archiving blog');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/me');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/me')}>Back to Login</button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="dashboard-container">
        <div className="loading">No user data available...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', background: '#f5f1e8' }}>
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <Link to="/" className="home-link">
            <FiHome /> Back to Portfolio
          </Link>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>{userData?.message || 'Welcome'}</h2>
          <p>Welcome back, {userData?.data?.email || 'Admin'}</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Email</h3>
            <p>{userData?.data?.email || 'N/A'}</p>
          </div>
          <div className="info-card">
            <h3>Role</h3>
            <p>{userData?.data?.role || 'Admin'}</p>
          </div>
          <div className="info-card">
            <h3>Access Level</h3>
            <p>{userData?.data?.accessLevel || 'Full'}</p>
          </div>
        </div>

        <div className="admin-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/blog/new')}>
              <FiPlus /> Add New Blog
            </button>
            <button className="action-btn">View Analytics</button>
            <button className="action-btn">Settings</button>
          </div>
        </div>

        <div className="blog-management">
          <div className="section-header-dash">
            <h3>Blog Management</h3>
            <button className="add-blog-btn" onClick={() => navigate('/blog/new')}>
              <FiPlus /> Create Blog
            </button>
          </div>
          
          {blogs.length === 0 ? (
            <div className="no-blogs">
              <p>No blogs yet. Create your first blog!</p>
            </div>
          ) : (
            <div className="blogs-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className={blog.archived ? 'archived-row' : ''}>
                      <td className="blog-title-cell">{blog.title}</td>
                      <td>{blog.category}</td>
                      <td>
                        <span className={`status-badge ${
                          blog.archived ? 'archived' : blog.published ? 'published' : 'draft'
                        }`}>
                          {blog.archived ? 'Archived' : blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                      <td className="actions-cell">
                        {!blog.published && !blog.archived && (
                          <button 
                            className="icon-btn publish-btn"
                            onClick={() => handlePublishBlog(blog._id, blog.published)}
                            title="Publish"
                          >
                            <FiCheck />
                          </button>
                        )}
                        <button 
                          className="icon-btn edit-btn"
                          onClick={() => navigate(`/blog/edit/${blog._id}`)}
                          title="Edit"
                          disabled={blog.archived}
                        >
                          <FiEdit />
                        </button>
                        <button 
                          className="icon-btn archive-btn"
                          onClick={() => handleArchiveBlog(blog._id)}
                          title={blog.archived ? 'Unarchive' : 'Archive'}
                        >
                          <FiArchive />
                        </button>
                        <button 
                          className="icon-btn delete-btn"
                          onClick={() => handleDeleteBlog(blog._id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
