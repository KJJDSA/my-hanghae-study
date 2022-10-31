const express = require("express");
const router = express.Router();

const MatchController = require("../controllers/match");
const matchController = new MatchController();

router.get("/match/host", matchController.matchLeader);

module.exports = router;
