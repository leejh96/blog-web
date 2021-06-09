const express = require('express');
const router = express.Router();
const { Notice } = require('../models');
router.get('/page', async(req, res)=>{
    const noticeCnt = await Notice.find().length;
    let remainder = noticeCnt % 10 ? 1 : 0 ;
    let page = parseInt(noticeCnt / 10) + remainder;
    let pageList = []
    for(let i = 1; i<=page; i++){
        pageList.push(i);
    }
    
    return res.status(200).json({
        success : true,
        total : pageList
    })
});

module.exports = router;
