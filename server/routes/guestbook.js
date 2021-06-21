const express = require('express');
const router = express.Router();
const { Guestbook } = require('../models');
const {auth} = require('../middleware/auth');

router.get('/', async(req, res) => {
    try {
        const guests = await Guestbook.find();
        return res.json({
            success : true,
            guests
        })            
    } catch (error) {
        console.error(error);
        return ;
    }


});
router.post('/', auth, async(req, res) => {
    try {
        const guestbook = await Guestbook.create({
            writer : req.user._id,
            text : req.body.text
        })
    
        if(guestbook){
            return res.json({
                success : true
            })
        }
        return res.json({
            success : false,
            message : '방명록 등록에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }

});

module.exports = router;
