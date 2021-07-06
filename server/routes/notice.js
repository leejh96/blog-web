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

router.get('/:id', async(req, res) => {
    try {
        const notice = await Notice.findOne({
                _id : req.params.id
        }).populate('author');
        return res.json({
            success : true,
            notice,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.post('/', auth, async(req, res)=>{
    try {
        await Notice.create({
            title : req.body.title,
            author : req.user._id,
            text :  req.body.text,
        })
        return res.json({
            success : true,
        })
    }
        
    catch (error) {
        console.error(error);
        return ;
    }    
});

router.update('/:id/addlike', auth, async(req, res)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.body.id
        },{ $addToSet: { like: { $each: req.user._id } } })
        
        console.log(notice);
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
