import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert(res.data.message);

      // Save token
      localStorage.setItem('token', res.data.token);

      // Redirect to /todo
      navigate('/todo');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// Lavender and Blue theme styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '2rem',
    background: 'lavender',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 255, 0.2)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#4B0082', // Indigo
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    borderRadius: '8px',
    backgroundColor: '#5B9BD5', // Soft blue
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default Login;
