// src/pages/Profile.js
import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const name = localStorage.getItem('name');
  return (
    <div>
      <h2>Welcome, {name}</h2>
      <Link to="/todo">Go to My To-Do List</Link>
    </div>
  );
};

export default Profile;
