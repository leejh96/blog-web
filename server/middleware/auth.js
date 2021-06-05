const { User } = require('../models/');
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        let token = req.cookies.authCookie;
        if(token === 'undefined'){
            return res.json({auth : false})
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
        return res.json({
            auth : false
        })
    
    } catch (error) {
        console.error(error);
        return ;
    }

}

module.exports = { auth };