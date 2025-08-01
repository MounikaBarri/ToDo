const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
