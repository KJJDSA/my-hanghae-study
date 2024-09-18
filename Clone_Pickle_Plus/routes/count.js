const express = require("express");
const router = express.Router();
const { Parties } = require("../models");

router.get('/', async (req, res) => {
  const count = await Parties.count({ where: { numOfMembers: 4 } });
  res.status(200).json({ data: count + 5030 })
})

module.exports = router;