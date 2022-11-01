const express = require("express");
const router = express.Router();
const Users = require("./user");
const MyPage = require("./mypage");
const MyParty = require("./myparty");
// const authRouter = require("./auth")
const Ott = require("./otts")
const Match = require("./match")
const Count = require("./count")

// router.use("/auth", authRouter); // 카카오 로그인 - 봉인
router.use("/user", Users);
// router.use("/users", Users); //추가 정보 기입
router.use("/mypage", MyPage);// 마이페이지 (마이파티랑 다름)
router.use("/myparty", MyParty); // 마이파티
router.use("/ott", Ott)
router.use("/addparty", Match);
router.use("/count", Count)

module.exports = router;
