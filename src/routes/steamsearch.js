const express = require("express");
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');
const authmiddleware = require("../middlewares/user/authmiddleware");

const SteamSearchController = require("../controllers/steamsearchcontroller");
const steamSearchController = new SteamSearchController();

router.get("/", authmiddleware, steamSearchController.steamSearch);

module.exports = router;
