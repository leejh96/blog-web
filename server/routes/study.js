const express = require('express');
const router = express.Router();
const { Study } = require('../models');
const { auth } = require('../middleware/auth');

router.get('/', async(req, res) => {
    try {
        const studies = await Study.find();
        if(studies){
            return res.json({
                success : true,
                studies,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.get('/recent', async(req, res) => {
    try {
        const studies = await Study.find().sort({ 'updatedAt' : -1}).limit(8);
        if(studies){
            return res.json({
                success : true,
                studies,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.post('/', auth, async(req, res) => {
    try {
        const study = await Study.create({
            subject : req.body.text,
            link : `/study/${req.body.text}`  
        })
        if(study){
            return res.json({
                success : true,
                study,
            })
        }
        return res.json({
            success : false
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.delete('/', auth, async(req, res) => {
    try {
        const del = await Study.deleteOne({
            _id :  req.body.id
        })
        if(del){
            return res.json({
                success : true,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.get('/:page', async(req, res) => {
    try {
        const page = await Study.findOne({ subject :  req.params.page });
        if(page){
            return res.json({
                success : true,
                page
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return;
    }
});

router.get('/:study/comment', async(req, res) => {
    try {
        const study = await Study.findOne({
                subject : req.params.study
        }).populate({
            path : 'comment',
            populate : {
                path : 'user',
            }
        })
        return res.json({
            success : true,
            comment : study.comment,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.post('/:study/create', auth, async(req, res) => {
    try {
        const text = await Study.create({
            subject : req.body.study,
            text ,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.put('/:study/comment', auth, async(req, res)=>{
    try {
        await Study.findOneAndUpdate({
            subject : req.params.study
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

router.put('/:page', auth, async(req, res)=> {
    try {
        const findStudy = await Study.findOneAndUpdate({ subject : req.params.page }, {
            text : req.body.text
        });
        if (findStudy){
            return res.json({
                success : true
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return;
    }

});

router.put('/:study/deletecomment', auth, async(req, res) => {
    try {
        const study = await Study.findOneAndUpdate({
            subject : req.params.study
        },{ '$pull': { comment : {
            _id : req.body.id
        }}});
        if(study){
            return res.json({
                success : true,
                comment : study.comment,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

module.exports = router;