const User = require('../models/userModels.js');



const updateUser = async(req, res) => {

    // get the user id from the request
    const { userId } = req.params || req.user.id;

    // get the user data from the request
    const { name, email, password } = req.body;


    try{
        // find the user by id
        const user = await User.findByIdAndUpdate( userId );

        // check if the user exists
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }

        //  update the user data
        if( name ){
            user.name = name;
        }
        if( email ){
            user.email = email;
        }
        if( password ){
            user.password = await bcrypt.hash(password, 10);
        }

        // save the user data
        await user.save();

        return res.status(200).json({ message: 'user updated successfully' });
        
        
    }catch(error){
        // handle server error
        console.error('server error in updateUser controller', error);
        return res.status(500).json({ message: 'server error in updateUser controller' });
    }
}

module.exports = { updateUser };