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
router.get('/count', async(req, res) => {
    try {
        const guestbook = await Guestbook.find();
        const GuestbookCnt = guestbook.length;
        let remainder = GuestbookCnt % 10 ? 1 : 0 ;
        let cnt = parseInt(GuestbookCnt / 10) + remainder;
        const pageArr = [];
        for(let i = 0; i< cnt; i++){
            pageArr.push(i+1);
        }
        return res.json({
            success : true,
            pageArr
        })            
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.get('/page', async(req, res)=>{
    const noticeCnt = await Notice.find().length;
    let remainder = noticeCnt % 10 ? 1 : 0 ;
    let page = parseInt(noticeCnt / 10) + remainder;
    const pageList = []
    for(let i = 1; i<=page; i++){
        pageList.push(i);
    }
    conosole.log(pageList);
    return res.status(200).json({
        success : true,
        total : pageList
    })
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
        const guestbook = await Guestbook.findOneAndDelete({ _id : req.body.id });
        if(guestbook){
            return res.json({
                success : true,
                guestbook
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
