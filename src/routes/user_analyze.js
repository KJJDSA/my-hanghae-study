const express = require('express');
const router = express.Router();

const UserAnalyzeController = require('../controllers/user_analyze_controller');
const userAnalyzeController = new UserAnalyzeController();

router.get('/best', userAnalyzeController.bestGame);

router.get('/',authmiddleware,userAnalyzeController.userLikeGame)

router.get('/like',authmiddleware,userAnalyzeController.UserBestList)

module.exports = router;