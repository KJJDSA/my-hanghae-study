const express = require("express");
const router = express.Router();
const Users = require("./users");
const MyPage = require("./mypage");

router.use("/users/", Users);
router.use("/mypage/", MyPage);

module.exports = router;
