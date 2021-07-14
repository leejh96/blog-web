const { User } = require('../models/');
const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = await jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
        if(token){
            const user = await User.findOne({ _id : token.data })
            if(user){
                req.user = user;
                req.token = req.headers.authorization;
                return next();
            }
            return res.json({
                success : false,
                auth : false,
                message : '액세스 토큰에 대한 유저를 찾을 수 없습니다.'
            })
        }
        return res.json({
            success : false,
            auth : false,
            message : '액세스 토큰이 유효하지 않습니다.'
        })
    } catch (error) {
        try {
            const token = await jwt.verify(req.cookies.rft, process.env.REFRESH_TOKEN_SECRET);
            if(token){
                const user = await User.findOne({ _id : token.data });
                if(user){
                    const accessTokenExp = Math.floor(Date.now() / 1000) + (5);    
                    
                    const accessToken = await jwt.sign({
                        exp : accessTokenExp,
                        data : user._id.toHexString()
                    }, process.env.TOKEN_SECRET);
                    
                    req.user = user;
                    req.token = accessToken;
                    return next();
                }
                return res.json({
                    success : false,
                    auth : false,
                    message : '리프레시 토큰에 대한 유저를 찾을 수 없습니다.'
                })
            }
            return res.json({
                success : false,
                auth : false,
                message : '리프레시 토큰이 유효하지 않습니다'
            })
        } catch (error) {
            return res.clearCookie('rft').json({
                expire : true,
                success : false,
                auth : false,
                message : '세션이 만료되었습니다.'
            })
        }
    }
}

module.exports = { auth };