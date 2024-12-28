const User = require('../models/userModels.js');
const generateToken = require('../utils/generateToken.js');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {

    // taking the name, email, password and confirmPassword from the request body
    const { name, email, password, confirmPassword } = req.body;

    // checking if the fields are empty
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // checking if the password and confirmPassword match
    if(password !== confirmPassword){
        return res.status(400).json({ message: 'Passwords do not match'});
    }

    try{
        // checking if the user already exists in the database
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: 'User already exists in the database' });
        }


        // creating a new user
        const user = await User.create({
            name,
            email,
            password
        })

        // sending the response
        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }catch(error){
        console.error('Error in registerUser:', error.message);
        return res.status(500).json({ message: 'server error in register controller' });
    }
}

module.exports = { registerUser }