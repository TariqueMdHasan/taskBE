const express = require('express');
const router = express.Router();
const { getTodo } = require('../controllers/getTodo.js');
const { createTodo } = require('../controllers/createTodo.js');
const { protect } = require('../middleware/authMiddleware.js');
const { updateTodo } = require('../controllers/updateTodo.js');
const { deleteTodo } = require('../controllers/deleteTodo.js');

router.get('/task', protect, getTodo);
router.post('/task', protect, createTodo);
router.put('/task/edit/:id', protect, updateTodo);
router.delete('/task/delete/:id', protect, deleteTodo);

module.exports = router;