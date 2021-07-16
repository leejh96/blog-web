const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');


router.post('/signup', async (req, res) => {
    try {
        const saltRounds = 10;
        const findUser = await User.findOne({ email : req.body.email});
        if (findUser){
            return res.status(200).json({
                success : false,
                message : '이미 존재하는 이메일 입니다.'
            })
        }
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create({
            username : req.body.username,
            password : hash,
            nick : req.body.nick,
            email : req.body.email,
        });
        if(user){
            return res.status(200).json({
                success : true
            });
        }
        return res.status(404).json({
            success : false,
            message : '회원가입에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }

})


router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({ email : req.body.email });
        if(user){
            const TF = await bcrypt.compare(req.body.password, user.password);
            if(TF){
                const refreshTokenExp = Math.floor(Date.now() / 1000) + (60*60*24*7);
                const accessTokenExp = Math.floor(Date.now() / 1000) + (60*30);

                const accessToken = await jwt.sign({
                    exp : accessTokenExp,
                    data : user._id.toHexString()
                }, process.env.TOKEN_SECRET);

                const refreshToken = await jwt.sign({
                    exp: refreshTokenExp,
                    data : user._id.toHexString()
                }, process.env.REFRESH_TOKEN_SECRET);
                
                user.refreshToken = refreshToken;
                user.refreshTokenExp = refreshTokenExp;
                await user.save();

                return res.
                status(200).
                cookie('rft', refreshToken, {
                    httpOnly : true,
                }).
                json({
                    success : true,
                    user,
                    accessToken,
                })
            }
        }
        return res.json({
            success : false,
            message : '아이디 및 비밀번호를 다시한번 확인해주시기 바랍니다'
        })
    } catch (error) {
        console.error(error);
        return ;
    }

});

router.get('/logout', auth, async(req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id : req.user._id}, { token: '' });
        if(user){
            return res
            .status(200)
            .clearCookie('rft')
            .json({ success : true });
        }
        return res.json({
            success : false,
            message : '로그아웃에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.get('/auth', auth, async(req, res) => {
    try {
        if(req.user){
            return res.status(200).json({
                success : true,
                user :  req.user,
                token : req.token,
                auth : true,
            })
        }
        return res.json({
            success : false,
            auth : false,
            message : '에러발생',
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

module.exports = router;