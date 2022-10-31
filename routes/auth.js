// const express = require('express');
// const { default: next } = require('next');
const passport = require('passport');
const { User } = require('../models');
const router = require('./users');
const jwt = require('jsonwebtoken')

//  카카오 로그인 : /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/oauth', passport.authenticate("kakao", {
    failureRedirect: '/',
}), async (req, res) => {
    const kakaoId = req.user.kakaoId
    console.log(kakaoId)
    const user = await User.findOne({ where: { kakaoId } })
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY)
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 600);
    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires });
    res.redirect('/');
});


//  로그아웃      : /auth/logout
router.get('/logout', (req, res, next) => {
    // 로그인 후 이므로 req.user 값 들어있음
    console.log('파기 들어갑니다.')
    req.logout(req.user, (err) => {
        if (err)
            return next(err)
    });
    req.session.destroy();
    console.log('로그아웃 되었습니다');
    res.redirect('/');
});



module.exports = router;