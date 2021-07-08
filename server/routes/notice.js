const express = require('express');
const router = express.Router();
const { Notice } = require('../models');
const { auth } = require('../middleware/auth');

router.get('/', async(req, res) => {
    try {
        const notices = await Notice.find().populate('author').sort('-date');
        return res.json({
            success : true,
            notices,
        })
    } catch (error) {
        console.error(error);
        return ;        
    }

});

router.get('/:id', auth, async(req, res) => {
    try {
        const notice = await Notice.findOne({
                _id : req.params.id
        }).populate('author');
        return res.json({
            success : true,
            notice,
            user : req.user._id,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.get('/:id/comment', auth, async(req, res) => {
    try {
        const notice = await Notice.findOne({
                _id : req.params.id
        }).populate({
            path : 'comment',
            populate : {
                path : 'user',
            }
        })
        return res.json({
            success : true,
            comment : notice.comment,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.post('/', auth, async(req, res)=>{
    try {
        const notice = await Notice.create({
            title : req.body.title,
            author : req.user._id,
            text :  req.body.text,
        })
        return res.json({
            success : true,
            notice,
        })
    }
        
    catch (error) {
        console.error(error);
        return ;
    }    
});

router.put('/comment', auth, async(req, res)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.body.id
        },{ '$push': { comment : {
            user : req.user._id,
            comment : req.body.comment,
            date : req.body.date,
        } }})
        return res.json({
            success : true,
        })
    }
        
    catch (error) {
        console.error(error);
        return ;
    }    
});

router.put('/:id/addlike', auth, async(req, res)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.params.id
        },{ '$addToSet': { like : req.user._id }})
        return res.json({
            success : true,
            notice,
        })
    }
        
    catch (error) {
        console.error(error);
        return ;
    }    
});

router.put('/:id/deletelike', auth, async(req, res)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.params.id
        },{ '$pull': { like : req.user._id }})
        return res.json({
            success : true,
            notice,
        })
    }
        
    catch (error) {
        console.error(error);
        return ;
    }    
});

module.exports = router;
