const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/login.js');
const { registerUser } = require('../controllers/register.js');
const { updateUser } = require('../controllers/updateUser.js');
const { deleteUser } = require('../controllers/deleteUser.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/update', protect, updateUser);
router.delete('/delete', protect, deleteUser);

module.exports = router;