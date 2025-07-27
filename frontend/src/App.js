import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header'; // only once here
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Todo from './pages/Todo';

function App() {
  return (
    <Router>
      <Header /> {/* <--- only here! */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
