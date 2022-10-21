const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("좋아요")
})

module.exports = router;