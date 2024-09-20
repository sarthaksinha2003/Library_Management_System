import React, { useState } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './style.css';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Books', 'Articles', 'Journals', 'Theses'];
  
  const resources = [
    { title: 'Introduction to Machine Learning', category: 'Books' },
    { title: 'Quantum Computing Basics', category: 'Articles' },
    { title: 'Advanced Data Science', category: 'Journals' },
    { title: 'AI and Ethics', category: 'Theses' },
    // Add more resource data here
  ];

  const filteredResources = resources.filter(resource =>
    (selectedCategory === 'All' || resource.category === selectedCategory) &&
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <nav className="dashboard-nav">
          <Link to="/" className="nav-icon">
            <FaHome size={24} />
          </Link>
          <Link to="/profile" className="nav-icon">
            <FaUser size={24} />
          </Link>
        </nav>
        <h1>National Digital Library Dashboard</h1>
      </header>

      <div className="dashboard-content">
        <section className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </section>

        <section className="dashboard-metrics">
          <h2>Library Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Total Resources</h3>
              <p>{resources.length}</p>
            </div>
            <div className="metric-card">
              <h3>Featured Resources</h3>
              <p>10</p>
            </div>
            <div className="metric-card">
              <h3>Active Users</h3>
              <p>2000</p>
            </div>
            <div className="metric-card">
              <h3>New Additions</h3>
              <p>25</p>
            </div>
          </div>
        </section>

        <section className="resources-section">
          <h2>Resources</h2>
          <table className="resources-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.length > 0 ? (
                filteredResources.map((resource, index) => (
                  <tr key={index}>
                    <td>{resource.title}</td>
                    <td>{resource.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No resources found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
