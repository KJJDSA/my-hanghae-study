const express = require("express");
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');

const SteamSearchController = require("../controllers/steamsearchcontroller");
const steamSearchController = new SteamSearchController();

router.get("/", steamSearchController.steamSearch);

module.exports = router;
