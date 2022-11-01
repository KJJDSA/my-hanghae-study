const express = require('express');
const router = express.Router();
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');
const UserController = require('../controllers/user')
const userController = new UserController();

router.post('/login', authLoginUserMiddleware, userController.postLogin)

router.post('/', authLoginUserMiddleware, userController.postSignup);

module.exports = router;