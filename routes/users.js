const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");
const usersController = new UserController();

router.post("/", usersController.createUser);



module.exports = router;
