import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ task: '', date: '', time: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to access your To-Do list.");
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!form.task || !form.date || !form.time) {
      alert("Please fill all fields.");
      return;
    }

    const newTodo = {
      task: form.task,
      date: form.date,
      time: form.time
    };

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = newTodo;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    setForm({ task: '', date: '', time: '' });
  };

  const handleEdit = (index) => {
    setForm(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My To-Do Activities</h2>

      <form onSubmit={handleAddOrUpdate} style={styles.form}>
        <input
          type="text"
          name="task"
          placeholder="Activity"
          value={form.task}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editIndex !== null ? 'Update' : 'Add'} Activity
        </button>
      </form>

      {todos.length === 0 ? (
        <p>No activities yet.</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{todo.task}</strong><br />
              Date: {todo.date}<br />
              Time: {todo.time}<br />
              <button onClick={() => handleEdit(index)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline Styles - Lavender and Blue Theme
const styles = {
  container: {
    maxWidth: '500px',
    margin: '100px auto',
    padding: '2rem',
    background: 'lavender',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 255, 0.2)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    color: '#4B0082',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
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
    backgroundColor: '#5B9BD5',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  listItem: {
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    background: '#e6e6fa',
    boxShadow: '0 2px 5px rgba(0,0,255,0.1)',
  },
  editButton: {
    marginRight: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    backgroundColor: '#6a5acd',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Todo;
