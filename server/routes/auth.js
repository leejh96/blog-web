const express = require('express');
const router = express.Router();
const passport = require('passport');
//클라이언트에서 구글로그인 시 요청을 보내는 곳
router.get('/google',
    passport.authenticate('google', { scope: ['profile'] })
);

//구글에서 요청을 보내는 곳
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3000/login' 
    }),
    (req, res) => ( res.redirect('http://localhost:3000') )
);

module.exports = router;