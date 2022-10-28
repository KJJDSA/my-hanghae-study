const express = require('express');
const router = express.Router();
const Users = require('./users');

router.use('/users/', Users);

module.exports = router;