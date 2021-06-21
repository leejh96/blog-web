const express = require('express');
const router = express.Router();
const { Study } = require('../models');


router.post('/', async(req, res) => {
    try {
        const study = await Study.findOne({ subject :  req.body.study });
        if(study === null){
            return res.json({
                success : false,
                message : '해당 텍스트의 글이 존재하지 않습니다.'
            })
        }
        return res.json({
            success : true,
            text : study.text
        })
    } catch (error) {
        console.error(error);
        return;
    }
});
router.post('/:study/create', async(req, res) => {
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
router.put('/:study/update', async(req, res)=> {
    try {
        const findStudy = await Study.findOneAndUpdate({ subject : req.body.study }, {
            text : req.body.text
        });
        if (findStudy === null){
            const content = await Study.create({
                subject : req.body.study,
                text : req.body.text
            })
            if( content === null ){
                return res.json({
                    success : false,
                    message : '글 작성에 실패했습니다.'
                })
            }
            return res.json({
                success : true
            })
        }
        return res.json({
            success : true,
        })
    } catch (error) {
        console.error(error);
        return;
    }

});

router.delete('/:study/delete', async(req, res) => {
    try {
        const deleteStudy = await Study.deleteOne({ subject : req.body.study})
        if (deleteStudy) {
            return res.json({
                success : true, 
            })
        }
        return res.json({
            success : false,
            message : '글 삭제에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    } 
});
module.exports = router;
