const express = require("express");
const router = express.Router();
const passport = require('passport');
const MyPageController = require("../controllers/mypage");
const myPageController = new MyPageController();
const authMiddleware = require("../middlewares/authmiddleware");

router.get("/account", myPageController.lookupMyBankAccount);
router.put("/account", myPageController.updateBankAccount);

router.get("/card", authMiddleware, myPageController.cardList);
router.post("/card", authMiddleware, myPageController.createCard);
router.put("/card/:BankCardId", authMiddleware, myPageController.cardEdit);
router.delete("/card/:BankCardId", authMiddleware, myPageController.cardDelete);

module.exports = router;
