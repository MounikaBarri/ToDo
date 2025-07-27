// src/pages/Todo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editTasks, setEditTasks] = useState({});
  const token = localStorage.getItem('token');

  // ✅ Fetch all todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/todo', {
          headers: { Authorization: token },
        });
        setTodos(res.data);
      } catch (err) {
        alert('Error fetching todos: ' + err.message);
      }
    };

    fetchTodos();
  }, [token]);

  // ✅ Add new task
  const addTodo = async () => {
    if (!task.trim()) return alert("Task can't be empty!");
    try {
      await axios.post(
        'http://localhost:5000/api/todo',
        { task },
        { headers: { Authorization: token } }
      );
      setTask('');
      refreshTodos();
    } catch (err) {
      alert('Error adding task: ' + err.message);
    }
  };

  // ✅ Update task or mark complete
  const updateTodo = async (id, newTask, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todo/${id}`,
        { task: newTask, completed },
        { headers: { Authorization: token } }
      );
      refreshTodos();
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  };

  // ✅ Delete task
  const deleteTodo = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`, {
        headers: { Authorization: token },
      });
      refreshTodos();
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  // ✅ Refresh todo list
  const refreshTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todo', {
        headers: { Authorization: token },
      });
      setTodos(res.data);
    } catch (err) {
      alert('Error refreshing todos: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 My To-Do List</h2>

      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTodo}>Add Task</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginTop: '10px' }}>
            <input
              type="text"
              value={editTasks[todo.id] ?? todo.task}
              onChange={e =>
                setEditTasks({ ...editTasks, [todo.id]: e.target.value })
              }
            />

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e =>
                updateTodo(todo.id, editTasks[todo.id] ?? todo.task, e.target.checked)
              }
              style={{ marginLeft: '10px' }}
            />

            <button
              onClick={() =>
                updateTodo(todo.id, editTasks[todo.id] ?? todo.task, todo.completed)
              }
              style={{ marginLeft: '10px' }}
            >
              Save
            </button>

            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
