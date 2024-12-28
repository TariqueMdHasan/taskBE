const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;