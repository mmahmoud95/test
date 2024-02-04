const jwt = require('jsonwebtoken');
const models = require('../models/index');

const isLogedIn = async (req, res, next)=> {
    
    try {
        //take token form headers and verify it to and use JWT password in env to access the jwt to verify token
        const token = req.headers.authorization
        // after take token use verify mothed to compayr the secrt key to make token verifyed 
        const deCoded  = jwt.verify(token, process.env.JWT_SECRET);
        // take the token and add it to req.currentUser to be can use it in any where but should use it as meddilWhere
        req.currentUser = deCoded;
        //get req currntUser form deCoded and find the id
        const _id = req.currentUser;
        const userShack = await models.User.findById(_id)
        // see if user is exsest im db and see if token exsest in authorization headers
        if(!token || !userShack){
            return res.status(401).json({message: 'error token or user not exsist'})
        }
        next()
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = isLogedIn;