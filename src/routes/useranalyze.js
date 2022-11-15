const express = require('express');
const router = express.Router();

const UserAnalyzeController = require('../controllers/useranalyzecontroller');
const userAnalyzeController = new UserAnalyzeController();

router.get('/best', userAnalyzeController.bestGame);

// router.post('/',userAnalyzeController.gameSearch);

module.exports = router;