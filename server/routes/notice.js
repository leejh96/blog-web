const express = require('express');
const router = express.Router();
const { Notice } = require('../models');
const { auth } = require('../middleware/auth');
const mongoose = require('mongoose')
router.get('/', async(req, res, next) => {
    try {
        const notices = await Notice.find().populate('author').sort('-date');
        if(notices){
            return res.json({
                success : true,
                notices,
            })
        }
        return res.json({
            success : false,
            message : '공지사항을 불러오는데 실패했습니다'
        })
    } catch (error) {
        next(error);
    }

});

router.get('/:id', auth, async(req, res, next) => {
    try {
        const oid = mongoose.Types.ObjectId.isValid(req.params.id)
        if(!oid){
            return res.json({
                auth: true,
                success : false,
                valid : false,
            })
        }
        const notice = await Notice.findOne({
            _id : req.params.id,
        }).populate('author');
        if(notice){
            return res.json({
                auth: true,
                success : true,
                notice,
            })
        }
        return res.json({
            auth: true,
            success : false,
            valid : true,
            message : '공지사항을 불러오는데 실패했습니다'
        })
    } catch (error) {
        next(error);
    }
})

router.get('/:id/like', auth, async(req, res, next) => {
    try {
        const oid = mongoose.Types.ObjectId.isValid(req.params.id)
        if(!oid){
            return res.json({
                success : false,
                auth : true,
                valid : false,
            })
        }
        const notice = await Notice.findOne({
            _id : req.params.id,
        }).populate('author');
        if(notice){
            return res.json({
                auth : true,
                success : true,
                like : notice.like,
                user : req.user._id,
            })
        }
        return res.json({
            auth : true,
            success : false,
            valid : true,
            message : '좋아요를 불러오는데 실패했습니다'
        })
    } catch (error) {
        next(error);
    }
})

router.get('/:id/comment', auth, async(req, res, next) => {
    try {
        const oid = mongoose.Types.ObjectId.isValid(req.params.id)
        if(!oid){
            return res.json({
                auth : true,
                valid : false,
                success : false,
            })
        }
        const notice = await Notice.findOne({
            _id : req.params.id
        }).populate({
            path : 'comment',
            populate : {
                path : 'user',
            }
        })
        if(notice){
            return res.json({
                auth : true,
                success : true,
                comment : notice.comment,
            })
        }
        return res.json({
            auth : true,
            valid : true,
            success : false,
            message : '공지사항을 불러오는데 실패했습니다'
        })
    } catch (error) {
        next(error);
    }
})

router.post('/', auth, async(req, res, next)=>{
    try {
        const notice = await Notice.create({
            title : req.body.title,
            author : req.user._id,
            text :  req.body.text,
            date : req.body.date,
        })
        if(notice){
            return res.json({
                auth : true,
                success : true,
                notice,
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '공지사항을 만드는 데 실패했습니다'
        })
    }
        
    catch (error) {
        next(error);
    }    
});

router.put('/:id/updatenotice', auth, async(req, res, next) => {
    try {
        const oid = mongoose.Types.ObjectId.isValid(req.params.id)
        if(!oid){
            return res.json({
                auth : true,
                valid : false,
                success : false,
            })
        }
        const notice = await Notice.findOneAndUpdate({_id : req.params.id},{
            title : req.body.title,
            text : req.body.text,
        })
        if(notice){
            return res.json({
                auth : true,
                success : true,
                notice,
            })
        }
        return res.json({
            auth : true,
            success : false,
            valid : true,
            message : '공지사항 수정에 실패했습니다'
        })
    } catch (error) {
        next(error);
    }
})

router.put('/comment', auth, async(req, res, next)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.body.id
        },{ '$push': { comment : {
            user : req.user._id,
            comment : req.body.comment,
            date : req.body.date,
        } }})
        if(notice){
            return res.json({
                auth : true,
                success : true,
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '댓글 작성에 실패했습니다'
        })
    }
        
    catch (error) {
        next(error)
    }    
});

router.put('/:id/addlike', auth, async(req, res, next)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.params.id
        },{ '$addToSet': { like : req.user._id }})
        if(notice){
            return res.json({
                auth : true,
                success : true,
                notice,
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '좋아요에 실패했습니다'
        })
    }
    catch (error) {
        next(error);
    }    
});

router.put('/:id/deletelike', auth, async(req, res, next)=>{
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.params.id
        },{ '$pull': { like : req.user._id }})
        if(notice){
            return res.json({
                auth : true,
                success : true,
                notice,
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '좋아요를 취소하는데 실패했습니다'
        })
        
    }
    catch (error) {
        next(error);
    }    
});

router.put('/:id/deletecomment', auth, async(req, res, next) => {
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.params.id
        },{ '$pull': { comment : {
            _id : req.body.id
        }}});
        if(notice){
            return res.json({
                auth : true,
                success : true,
                comment : notice.comment,
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '댓글을 지우는데 실패했습니다',
        })
    } catch (error) {
        next(error);
    }
});

router.delete('/:id/deletenotice',  auth, async(req, res, next) => {
    try {
        const deleteNotice = await Notice.deleteOne({
            _id : req.params.id
        });
        if(deleteNotice.ok){
            return res.json({
                auth : true,
                success : true,
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '공지사항을 지우는데 실패했습니다'
        })
    } catch (error) {
        next(error);
    }
});
module.exports = router;
