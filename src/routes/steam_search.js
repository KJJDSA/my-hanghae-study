const express = require("express");
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');
const authmiddleware = require("../middlewares/user/auth_middleware");

const SteamSearchController = require("../controllers/steam_search_controller");
const steamSearchController = new SteamSearchController();

router.get("/", authmiddleware, steamSearchController.steamSearch);
router.get("/appid", authmiddleware, steamSearchController.steamAppidSearch);

module.exports = router;
