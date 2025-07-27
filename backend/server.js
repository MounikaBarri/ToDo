// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const authRoutes = require('./routes/auth');
require('./config/db'); // Ensure DB connects on startup

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
