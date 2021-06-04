const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
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

module.exports = router;