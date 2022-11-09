const express = require('express');
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');

const SteamSearchController = require('../controllers/steamsearchcontroller');
const steamSearchController = new SteamSearchController();

router.get('/', steamSearchController.gameList);

router.post('/',steamSearchController.gameSearch);

module.exports = router;