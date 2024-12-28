const Todo = require('../models/todoModels.js');


const createTodo = async(req, res) => {
    // get the title, priority, subTodos, and dueDate from the request body
    const { title, priority, subTodos, dueDate } = req.body;


    // check if all fields are provided
    if(!title || !priority || !dueDate){
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        // create a new todo
        const todo = await Todo.create({
            userId: req.user.id,
            title,
            priority,
            subTodo: subTodos,
            dueDate
        });
        return res.status(201).json({ todo });

    }catch(error){
        return res.status(500).json({ message: 'server error from createTodo folder'})
    }
}

module.exports = { createTodo };