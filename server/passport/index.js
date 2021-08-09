const google = require('./GoogleStrategy');
const { User } = require('../models');

module.exports = (passport) =>{
    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ _id : id});
            done(null, user); 
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
    google(passport);
};