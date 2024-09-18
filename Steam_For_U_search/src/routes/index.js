const express = require("express");
const router = express.Router();

const UserRouter = require("./user");
const SteamSearchRouter = require("./steam_search");
const UserAnalyzeRouter = require("./user_analyze");

//회원 관련 라우터(회원가입,로그인)
router.use("/user", UserRouter);
//스팀 게임 검색 라우터
router.use("/search", SteamSearchRouter);
//유저 분석 라우터
router.use("/analyze", UserAnalyzeRouter);

router.use("/", function (req, res) {
  res.render("index");
});
module.exports = router;