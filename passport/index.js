; const passport = require('passport');
const kakao = require('./kakaoStretegy');
const Users = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    })
    passport.deserializeUser((id, done) => {
        const user = Users.findOne({ where: { id } })
            .then(user => {
                console.log(user)
                done(null, user)
            })
            .catch(err => done(err))
        // console.log(user);
    })
    console.log('passport의 index.js까지 옴');
    kakao();
}