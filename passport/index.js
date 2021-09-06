const google = require('./GoogleStrategy');
const { User } = require('../models');

module.exports = (passport) =>{
    //GoogleStrategy에서 로그인 성공시의 cb(null, user)에서 user값을
    //세션에 저장하는 부분(req.session.passport.user)
    passport.serializeUser((user, done) =>{
        done(null, user._id); //user._id값이 req.session.passport.user에 저장됨
    });

    //서버로 들어오는 요청마다 실제 DB의 값과
    //sereailizeUser에서 저장된 세션 값과 비교
    //해당 유저의 정보가 있다면 done의 두번째 인자를 req.user에 저장
    //요청을 처리할 때 req.user를 통해서 넘겨준다.
    //첫번째 인자인 id는 serializeUser에서 세션에 저장한 user.id값이 된다.
    //즉, serializeUser의 done함수의 두번째 인자는 deserializerUser의 첫번째 인자가 된다.
    passport.deserializeUser( async (_id, done) => {
        // id값 만으로는 req.user값을 만들 수 없기에
        // user값을 찾아서 done(null, user)해주어 req.user에 user정보를 넣어줌
        try {
            const user = await User.findOne({ _id });
            done(null, user); 
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
    google(passport);
};