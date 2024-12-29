const Todo = require('../models/todoModels.js');


const deleteTodo = async(req, res) => {
    // get the todoId from the request parameters
    const { todoId } = req.params;


    try{    

        // find the todo by the todoId
        const todo = await Todo.findByIdAndDelete( todoId );


        // if the todo is not found, return a 404 error
        if(!todo){
            return res.status(404).json({ message: 'Todo not found' });
        }

        // if the todo does not belong to the user, return a 401 error
        if (todo.userId.toString() !== req.user.id ){
            return res.status(401).json({ message: 'Not authorized' });
        }

        // delete the todo
        await todo.remove();

        return res.status(200).json({ message: 'Todo deleted', todo });
    }catch(error){
        // if there is a server error, return a 500 error with a message
        console.error('server error from deleteTodo folder', error.message);
        return res.status(500).json({ message: 'server error from deleteTodo folder' });
    }
}


module.exports = { deleteTodo };