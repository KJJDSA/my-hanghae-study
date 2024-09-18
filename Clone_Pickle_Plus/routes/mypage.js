const express = require("express");
const router = express.Router();
const passport = require("passport");
const MyPageController = require("../controllers/mypage");
const myPageController = new MyPageController();
const authMiddleware = require("../middlewares/authmiddleware");


// 유저 닉네임, 폰번호 조회
router.get("/", authMiddleware, myPageController.nicknameAndPhone);
// 유저 닉네임, 폰번호 수정
router.put("/", authMiddleware, myPageController.updateNicknameAndPhone);
// 유저 탈퇴
router.delete("/", authMiddleware, myPageController.deleteUserAccount);

router.get("/account", authMiddleware, myPageController.lookupMyBankAccount);
router.post("/account", authMiddleware, myPageController.registerBankAccount);
router.put("/account", authMiddleware, myPageController.updateBankAccount);
router.delete("/account", authMiddleware, myPageController.deleteBankAccount);

router.get("/card", authMiddleware, myPageController.cardList);
router.post("/card", authMiddleware, myPageController.createCard);
router.put("/card", authMiddleware, myPageController.cardEdit);
router.delete("/card", authMiddleware, myPageController.cardDelete);

module.exports = router;
