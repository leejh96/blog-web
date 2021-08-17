const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            // 현재위치가 아닌 맨처음에서 시작하는 듯
            cb(null, 'upload/');
        },

        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, file.originalname.split('.')[0] + Date.now() + ext);    
        }
    }),
    limits: {fileSize: 5 * 1024 *1024}
});

router.post('/signup', async (req, res) => {
    try {
        const saltRounds = 10;
        const findUser = await User.findOne({ email : req.body.email});
        if (findUser){
            return res.status(200).json({
                success : false,
                message : '이미 존재하는 이메일 입니다.'
            })
        }
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create({
            username : req.body.username,
            password : hash,
            nick : req.body.nick,
            email : req.body.email,
        });
        if(user){
            return res.status(200).json({
                success : true
            });
        }
        return res.status(404).json({
            success : false,
            message : '회원가입에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.post('/findpassword', async(req, res)=>{
    try {
        const user = await User.findOne({
            email : req.body.email,
            username :  req.body.name,
        })
        if(user){
            return res.json({
                success : true,
                user : user._id
            });
        }
        return res.json({
            success : false,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.post('/newpassword', async(req, res)=>{
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.findOneAndUpdate({ _id : req.body.id}, { password : hash})
        if(user){
            return res.json({
                success : true,
            });
        }
        return res.json({
            success : false,
            message : '비밀번호 변경에 실패했습니다'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
})

router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({ email : req.body.email });
        if(user){
            const TF = await bcrypt.compare(req.body.password, user.password);
            if(TF){
                const refreshTokenExp = Math.floor(Date.now() / 1000) + (60*60*24*7);
                const accessTokenExp = Math.floor(Date.now() / 1000) + (60*30);

                const accessToken = await jwt.sign({
                    exp : accessTokenExp,
                    data : user._id.toHexString()
                }, process.env.TOKEN_SECRET);

                const refreshToken = await jwt.sign({
                    exp: refreshTokenExp,
                    data : user._id.toHexString()
                }, process.env.REFRESH_TOKEN_SECRET);
                
                user.refreshToken = refreshToken;
                user.refreshTokenExp = refreshTokenExp;
                await user.save();

                return res.
                status(200).
                cookie('rft', refreshToken, {
                    httpOnly : true,
                }).
                json({
                    success : true,
                    user,
                    accessToken,
                })
            }
        }
        return res.json({
            success : false,
            message : '아이디 및 비밀번호를 다시한번 확인해주시기 바랍니다'
        })
    } catch (error) {
        console.error(error);
        return ;
    }

});
router.get('/logout', auth, async(req, res) => {
    try {
        if(req.user.provider === 'local'){
            const user = await User.findOneAndUpdate(
                {_id : req.user._id}, 
                { 
                    refreshToken: '',
                    refreshTokenExp : 0,
                }
            );
            if(user){
                return res
                .status(200)
                .clearCookie('rft')
                .json({ success : true });
            }
            return res.json({
                success : false,
                message : '로그아웃에 실패했습니다.'
            })
        }
        if(req.user.provider === 'google'){
            req.logout();
            return res
                .clearCookie('connect.sid')
                .json({ success : true })
        }
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.get('/auth', auth, async(req, res) => {
    try {
        if(req.user){
            return res.status(200).json({
                success : true,
                user :  req.user,
                token : req.token,
                auth : true,
            })
        }
        return res.json({
            success : false,
            auth : false,
            message : '에러발생',
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.get('/logged', async(req, res) => {
    try {
        //구글 로그인이 된 상황
        if(req.user){
            return res.status(200).json({
                success : true,
                user : req.user,
                auth : true,
            })
        }
        //로컬과 구글 둘 다 로그인이 되지 않은 상황
        return res.json({
            success : true,
            auth : false,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});
router.put('/nick', auth, async(req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id : req.user._id }, { nick : req.body.nick});
        if(user){
            return res.json({
                success : true,
                message : '변경을 완료했습니다',
                user,
            })
        }
        return res.json({
            success : false,
            message : '닉네임 변경에 실패했습니다.',
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.put('/password', auth, async(req, res) => {
    try {
        const saltRounds = 10;
        const user = await User.findOne({ _id : req.user._id});
        if(user){
            const TF = await bcrypt.compare(req.body.password, user.password);
            if(TF){
                return res.json({
                    success : false,
                    message : '기존의 비밀번호와 일치합니다. 다른 비밀번호를 입력하세요.'
                })
            }
            const password = await bcrypt.hash(req.body.password, saltRounds);
            if(password){
                const updateUser = await User.findOneAndUpdate({ _id : req.user._id }, { password })
                return res.json({
                    success : true,
                    message : '비밀번호가 변경되었습니다.',
                    user : updateUser,
                })
            }
        }
        return res.json({
            success: false,
            message : '유저를 찾을 수 없습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.put('/img', auth, upload.single('file'), async(req, res) => {
    try {
        const userImg = await User.findOne({ _id : req.user._id});
        if(userImg.img !== ''){
            fs.unlink(`upload/${req.user.img}`, err => {
                if (err) {
                    console.error(err);
                    return ;
                }
            });
        }
        const user = await User.findOneAndUpdate({ _id : req.user._id}, { img : req.file.filename});
        if(user){
            return res.json({
                success : true,
                file : req.file.filename,
            }); 
        }
        return res.json({
            success : false,
            message : '이미지 변경에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.put('/deleteimg', auth, async(req, res) => {
    try {
        fs.unlink(`upload/${req.body.img}`, err => {
            if (err) {
                console.error(err);
                return ;
            }
        });
        const user = await User.findOneAndUpdate({ _id : req.user._id}, { img : '' });
        if(user){
            return res.json({
                success : true,
                img : '',
            }); 
        }
        return res.json({
            success : false,
            message : '이미지 삭제에 실패했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.put('/motto', auth, async(req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id : req.user._id}, { motto : req.body.text});
        if(user){
            return res.json({
                success : true,
                motto : req.body.text
            })
        }
        return res.json({
            success : false,
            message : '유저를 가져오는데 실패했습니다.',
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.delete('/', auth, async(req, res) => {
    try {
        const user = await User.findOne({ _id : req.user._id});
        if(user){
            const TF = await bcrypt.compare(req.body.password, user.password);
            if(TF){
                if(req.user.img){
                    fs.unlink(`upload/${req.user.img}`, err => {
                        if (err) {
                            console.error(err);
                            return res.json({
                                success : false,
                                message : '이미지 제거에 실패했습니다.'
                            });
                        }
                    });
                }
                await User.findOneAndDelete({ _id : req.user._id});
                return res
                .clearCookie('rft')
                .json({
                    success : true,
                    message : '회원탈퇴가 완료되었습니다.',
                })
            }
            return res.json({
                success : false,
                message : '비밀번호가 일치하지 않습니다.',
            })
        }
        return res.json({
            success : false,
            message : '회원탈퇴 에러가 발생했습니다.'
        })
    } catch (error) {
        console.error(error);
        return ;
    }
});

router.delete('/oauth', async(req, res) => {
    try {
        if(req.user.img){
            fs.unlink(`upload/${req.user.img}`, err => {
                if (err) {
                    console.error(err);
                    return res.json({
                        success : false,
                        message : '이미지 제거에 실패했습니다.'
                    });
                }
            });
        }
        await User.findOneAndDelete({ _id : req.user._id });
        req.logout();
        return res
            .clearCookie('connect.sid')
            .json({
                success : true,
                message : '회원탈퇴가 완료되었습니다.',
            })
    } catch (error) {
        console.error(error);
        return ;
    }
})

module.exports = router;