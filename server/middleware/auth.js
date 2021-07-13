const { User } = require('../models/');
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.authCookie;
        if(!token){
            return res.json({ 
                auth : false,
                message : '로그인을 해주시기 바랍니다.'
            })
        }
        const id = await jwt.verify(token, process.env.TOKEN_SECRET);
        if(id){
            const user = await User.findOne({ _id : id })
            if(user){
                req.user = user;
                req.token = user.token;
                return next();
            }
        }
        return res
        .clearCookie('authCookie')
        .json({
            auth : false
        })
    
    } catch (error) {
        console.error(error);
        return ;
    }

}

module.exports = { auth };