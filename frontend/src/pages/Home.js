// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Your To-Do App</h1>
          <p>Organize your daily tasks, stay productive, and manage your time efficiently.</p>

          {!isAuthenticated ? (
            <div className="buttons">
              <Link to="/login" className="home-btn">Login</Link>
              <Link to="/signup" className="home-btn">Sign Up</Link>
            </div>
          ) : (
            <div className="buttons">
              <Link to="/todo" className="home-btn">Go to My Tasks</Link>
              <Link to="/profile" className="home-btn">View Profile</Link>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>App Features</h2>
        <ul>
          <li>✅ Manage your personal tasks efficiently</li>
          <li>🔐 Secure user authentication</li>
          <li>📅 Track your progress with ease</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
