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

router.get("/card", authMiddleware, myPageController.lookupMyBankAccount);
router.post("/card", authMiddleware, myPageController.updateBankAccount);
router.put("/card", authMiddleware, myPageController.lookupMyBankAccount);
router.delete("/card", authMiddleware, myPageController.updateBankAccount);

module.exports = router;
