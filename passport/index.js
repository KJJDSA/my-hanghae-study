const passport = require('passport');
const kakao = require('./kakaoStretegy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userId);
        console.log(user.userId);
    })
    passport.deserializeUser((id, done) => {
        const user = User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err))
        console.log(user);
    })
    console.log('passport의 index.js까지 옴');
    kakao();
}