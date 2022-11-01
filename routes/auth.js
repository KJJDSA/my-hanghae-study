const express = require("express");
const passport = require("passport");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authMiddleware = require("../middlewares/authmiddleware");

//  카카오 로그인 : /auth/kakao
router.get("/kakao", passport.authenticate("kakao"));

router.get('/kakao/oauth', passport.authenticate("kakao", {
  session: false, // 세션 기능 비활성화(아래 req는 잘 들어감)
  failureRedirect: '/',
}), async (req, res) => {
  // 토큰 생성 - 카카오 가입 or 로그인 모두 이쪽으로 오게 됨.
  const kakaoId = req.user.kakaoId;
  const user = await Users.findOne({ where: { kakaoId } });
  const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 600);
  res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
    expires: expires,
  });
  if (req.user.signup === true) {
    return res.redirect("http://localhost:3000/api/user") // signup 프로퍼티가 true면 추가정보 입력란으로. 근데 이거 링크를 뭐라고 달면 되지..
  }
  res.redirect(`http://localhost:3000?token=${token}`);
}
);

//  로그아웃      : /auth/logout
router.get("/logout", (req, res, next) => {
  // 로그인 후 이므로 req.user 값 들어있음
  console.log("파기 들어갑니다.");
  req.logout(req.user, (err) => {
    if (err) return next(err);
  });
  req.session.destroy();
  console.log("로그아웃 되었습니다");
  res.redirect("/");
});

module.exports = router

