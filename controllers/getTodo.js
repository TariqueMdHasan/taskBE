const Todo = require('../models/todoModels.js');

const getTodo = async(req, res) => {
    try{
        // get all todos that belong to the user
        const todos = await Todo.find({ userId: req.user.id });
        res.status(200).json({ message: 'All todos', todos });
    }catch(error){
        return res.status(500).json({ message: 'server error from getTodo folder' });
    }
}

module.exports = { getTodo };