const express = require('express');
const router = express.Router();

const authmiddleware = require("../middlewares/user/auth_middleware");


const UserAnalyzeController = require('../controllers/user_analyze_controller');
const userAnalyzeController = new UserAnalyzeController();

router.get('/best', userAnalyzeController.bestGame);

router.get('/',authmiddleware,userAnalyzeController.userLikeGame)

router.get('/like',authmiddleware,userAnalyzeController.UserBestList)

router.get('/new',userAnalyzeController.newGame)

module.exports = router;