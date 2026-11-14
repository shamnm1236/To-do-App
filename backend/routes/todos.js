const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const router = express.Router();

// Reject malformed ids before they reach Mongoose
router.param('id', (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid to-do id' });
  }
  next();
});

// CREATE  POST /api/todos
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({ title: req.body.title });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL  GET /api/todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE  GET /api/todos/:id
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'To-do not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE  PUT /api/todos/:id   (title and/or completed)
router.put('/:id', async (req, res) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ message: 'To-do not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE  DELETE /api/todos/:id
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'To-do not found' });
    res.json({ message: 'To-do deleted', id: todo._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
