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
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });        
    }

});

router.get('/:id', auth, async(req, res, next) => {
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
        console.log(error.message);
        return res
        .status( error.status || 500 )
        .send(`${error.status} 에러!`)
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
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
    }
})

router.post('/', auth, async(req, res)=>{
    try {
        const notice = await Notice.create({
            title : req.body.title,
            author : req.user._id,
            text :  req.body.text,
            date : req.body.date,
        })
        return res.json({
            success : true,
            notice,
        })
    }
        
    catch (error) {
        console.error(error);
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
    }    
});

router.put('/:id/updatenotice', async(req, res) => {
    try {
        const notice = await Notice.findOneAndUpdate({_id : req.params.id},{
            title : req.body.title,
            text : req.body.text,
        })
        if(notice){
            return res.json({
                success : true,
                notice,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
    }
})

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
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
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
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
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
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
    }    
});

router.put('/:id/deletecomment', auth, async(req, res) => {
    try {
        const notice = await Notice.findOneAndUpdate({
            _id : req.params.id
        },{ '$pull': { comment : {
            _id : req.body.id
        }}});
        if(notice){
            return res.json({
                success : true,
                comment : notice.comment,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
    }
});

router.delete('/:id/deletenotice',  auth,async(req, res) => {
    try {
        //deleteOne은 리턴값이 삭제된 값이 아니다.
        const deleteNotice = await Notice.deleteOne({
            _id : req.params.id
        });
        if(deleteNotice){
            return res.json({
                success : true,
            })
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return res.json({
            success : false,
            message : '서버 에러!',
            error,
        });
    }
});
module.exports = router;
