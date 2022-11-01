const express = require("express");
const router = express.Router();
const passport = require("passport");
const MyPageController = require("../controllers/mypage");
const myPageController = new MyPageController();
const authMiddleware = require("../middlewares/authmiddleware");

router.get("/account", authMiddleware, myPageController.lookupMyBankAccount);
router.post("/account", authMiddleware, myPageController.registerBankAccount);
router.put("/account", authMiddleware, myPageController.updateBankAccount);
router.delete("/account", authMiddleware, myPageController.deleteBankAccount);

router.get("/card", authMiddleware, myPageController.cardList);
router.post("/card", authMiddleware, myPageController.createCard);
router.put("/card/:BankCardId", authMiddleware, myPageController.cardEdit);
router.delete("/card/:BankCardId", authMiddleware, myPageController.cardDelete);

module.exports = router;
