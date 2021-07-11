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

module.exports = router;