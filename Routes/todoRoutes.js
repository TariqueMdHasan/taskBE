const express = require('express');
const router = express.Router();
const { getTodo } = require('../controllers/getTodo.js');
const { createTodo } = require('../controllers/createTodo.js');
const { protect } = require('../middleware/authMiddleware.js');

router.get('/task', protect, getTodo);
router.post('/task', protect, createTodo);

module.exports = router;