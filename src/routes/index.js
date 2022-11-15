const express = require("express");
const router = express.Router();

const UserRouter = require("./user");
const SteamSearchRouter = require("./steamsearch");
const UserAnalyzeRouter = require("./useranalyze");

//회원 관련 라우터(회원가입,로그인)
router.use("/user", UserRouter);
//스팀 게임 검색 라우터
router.use("/search", SteamSearchRouter);
//유저 분석 라우터
router.use("/", function (req, res) {
  res.render("index");
});
router.use("/analyze", UserAnalyzeRouter);

module.exports = router;
