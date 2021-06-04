const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res)=>{
    try {
        const user = await User.findOne({ email : req.body.email });
        const TF = bcrypt.compare(req.body.password, user.password)
        if(TF){
            const token = jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET)
            user.token = token;
            return res.status(200).json({
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


module.exports = router;