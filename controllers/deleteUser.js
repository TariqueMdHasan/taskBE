const User = require('../models/userModels.js');

const deleteUser = async(req, res) =>{
    // get the user id from the request
    const { userId } = req.user.id || req.params;

    try{
        // find the user by id and delete it
        const user = await User.findByIdAndDelete(userId);

        // check if the user exists
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }

        // delete all the todos of the user
        await Todo.deleteMany({ user: userId });

        // remove the user
        await user.remove();

        // send the response
        return res.status(200).json({ message: 'user deleted successfully' });

    }catch(error){
        // handle server error
        console.error('server error in deleteUser controller', error);
        return res.status(500).json({ message: 'server error in deleteUser controller' });
    }
}

module.exports = { deleteUser };