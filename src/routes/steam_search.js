const express = require("express");
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');
const authmiddleware = require("../middlewares/user/auth_middleware");

const SteamSearchController = require("../controllers/steam_search_controller");
const steamSearchController = new SteamSearchController();

// 일반 검색을 필터 확장성을 고려하여 post로 변경. 속도도 좀 더 빠른듯하다.
router.post("/", authmiddleware, steamSearchController.steamSearch);
router.get("/appid", authmiddleware, steamSearchController.steamAppidSearch);

module.exports = router;
