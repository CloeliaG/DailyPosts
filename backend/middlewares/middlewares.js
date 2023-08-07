require('dotenv').config();
const jwt = require('jsonwebtoken');
const usersService = require('../service/userService');

exports.isUserLogged = async(req, res, next) => {
    if(req.headers && req.headers.authorization){
        const [scheme, token] = req.headers.authorization.split(" ");
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if(err){
                    console.log(err);
                    res.status(403).json({message: "NOT AUTHORIZED"});
                }else{
                    req.user = await usersService.getUserById(decoded.data.id);
                    next();
                }
            });
        }else{
            res.status(403).json({message: "NOT AUTHORIZED"});
        }
    }else{
        res.status(403).json({message: "NOT AUTHORIZED"});
    }
}