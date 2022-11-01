const express = require("express");
const router = express.Router();
const Users = require("./users");
const MyPage = require("./mypage");
const authRouter = require("./auth")
const Ott = require("./otts")
const mypartyRouter = require("./myparty");
const Match = require("./match")

router.use("/auth", authRouter); // 카카오 로그인
router.use("/users", Users); //추가 정보 기입
router.use("/mypage", MyPage); // 마이페이지 (마이파티랑 다름)
router.use("/ott", Ott)
router.use("/myparty", mypartyRouter); // 마이파티
router.use("/addparty", Match)

module.exports = router;
