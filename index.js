const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');

// importing db config and routes
const connectDB = require('./Config/db.js');
const authRoutes = require('./Route/authRoutes.js');
const todoRoutes = require('./Route/todoRoutes.js');


// app config
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// db config
connectDB();

const PORT = process.env.PORT || 5000;
// console.log(process.env.JWT_SECRET);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

// api endpoints
app.get('/', (req, res) => res.status(200).send('Hello World'));

// listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})