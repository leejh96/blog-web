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
        return res.status(200).json({
            success : true
        });
    } catch (error) {
        console.error(error);
        return ;
    }

})


router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({ email : req.body.email });
        const TF = await bcrypt.compare(req.body.password, user.password);
        if(TF){
            const token = jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET)
            user.token = token;
            return res
            .status(200)
            .cookie('authCookie', token, {
                maxAge: 30*60*1000,
                httpOnly: true,
            })
            .json({
                success : true
            })
        }
        return res.status(200).json({
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
        const user = await User.findOneAndUpdate({_id : req.user._id}, {token: '', tokenExp : ''})
        res
        .status(200)
        .clearCookie('authCookie')
        .json({ success : true });
    } catch (error) {
        console.error(error);
        return ;
    }
    req.cookies.authCookie
});


module.exports = router;