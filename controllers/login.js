const User = require('../models/userModels.js');
const generateToken = require('../utils/generateToken.js');
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs');

const loginUser = async(req, res) => {

    // taking the email and password from the request body
    const { email, password } = req.body;

    // checking if the fields are empty
    if(!email || !password){
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try{
        // checking if the user exists in the database
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'User does not exists' });
        }

        // checking if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password' });
        }

        // sending the response
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }catch(error){
        return res.status(500).json({ message: 'server error in login controller' });
    }
}

module.exports = { loginUser };