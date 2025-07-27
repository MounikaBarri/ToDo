// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Todo from './pages/Todo';
import Home from './pages/Home';
import Header from './pages/Header';
import Footer from './pages/Footer';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Header />
      <div className="container main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/todo" /> : <Signup />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/todo" /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/todo" element={isAuthenticated ? <Todo /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
