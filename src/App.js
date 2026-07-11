import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AllBlogs from './pages/AllBlogs';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BlogEditor from './pages/BlogEditor';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Loader isLoading={isLoading} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/me" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/new" element={<BlogEditor />} />
          <Route path="/blog/edit/:id" element={<BlogEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
