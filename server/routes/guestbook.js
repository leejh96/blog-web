const express = require('express');
const router = express.Router();
const { Guestbook } = require('../models');
const {auth} = require('../middleware/auth');

router.get('/', async(req, res) => {
    try {
        const guests = await Guestbook.find().populate('writer').sort('-date'); // -는 내림차순
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
            text : req.body.text,
            date : req.body.date,
        })
        if(guestbook){
            return res.json({
                success : true,
                createContent : guestbook
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

router.delete('/', async(req, res) => {
    try {
        const guest = await Guestbook.findOneAndDelete({ _id : req.body.id });
        if(guest){
            return res.json({
                success : true
            })
        }
        return res.json({
            success : false,
            message : '삭제하는데 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }

});
module.exports = router;
