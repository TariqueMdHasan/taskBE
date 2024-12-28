const jwt = require('jsonwebtoken');
const User = require('../models/userModels.js');

const protect = async ( req, res, next ) => {
    let token;



    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'something wrong in authMiddleware in middleware folder'});
        }
    }

    if(!token) {
        return res.status(401).json({ message: "not authorized, no token" })
    }
}

module.exports = { protect }