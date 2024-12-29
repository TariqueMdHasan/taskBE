const Todo = require('../models/todoModels.js');

const updateTodo = async(req, res) => {

    // get the todoId from the request parameters
    const { todoId } = req.params;

    // get the title, priority, subtodos, and dueDate from the request body
    const { title, priority, subtodos, dueDate } = req.body;

    try{
        // find the todo by the todoId
        const todo = await Todo.findByIdAndUpdate( todoId );

        // if the todo is not found, return a 404 error
        if(!todo){
            return res.status(404).json({ message: 'Todo not found' });
        }

        // if the todo does not belong to the user, return a 401 error
        if (todo.userId.toString() !== req.user.id ){
            return res.status(401).json({ message: 'Not authorized' });
        }

        // if the title, priority, subtodos, or dueDate is provided, update the todo
        if(title){
            todo.title = title;
        }

        if(priority){
            todo.priority = priority;
        }

        if(subtodos){         
            todo.subtodos = subtodos;
        }

        if(dueDate){
            todo.dueDate = dueDate;
        }

        // save the updated todo
        await todo.save();

        // return a 200 response with a success message and the updated todo
        return res.status(200).json({ message: 'Todo updated', todo });
    }catch(error){
        // if there is a server error, return a 500 error with a message
        console.error('server error from updateTodo folder', error.message);
        return res.status(500).json({ message: 'server error from updateTodo folder' });
    }
}

module.exports = { updateTodo };