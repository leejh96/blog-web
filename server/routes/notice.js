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

module.exports = router;
