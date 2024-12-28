const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true });

// encrypt password before saing in db
userSchema.pre('save', async function (next) {
    
    // checking if password is not modified
    if(!this.isModified('password')) return next();

    // hashing password
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

module.exports = mongoose.model('User', userSchema);