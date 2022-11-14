const express = require('express');
const router = express.Router();

const UserAnalyzeController = require('../controllers/useranalyzecontroller');
const userAnalyzeController = new UserAnalyzeController();

// router.get('/', userAnalyzeController.gameList);

// router.post('/',userAnalyzeController.gameSearch);

module.exports = router;