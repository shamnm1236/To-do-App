require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo_app';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use('/api/todos', todoRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // 0.0.0.0 so phones/emulators on the same network can reach the API
    app.listen(PORT, '0.0.0.0', () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
