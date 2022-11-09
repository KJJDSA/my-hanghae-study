const express = require('express');
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');

const UserController = require('../controllers/usercontroller');
const userController = new UserController();

//userId로 회원가입이 되어있는지 체크하는 테스트 코드
router.get('/:userId', userController.checkUser);

//회원가입
router.post('/signup',userController.signUp);

//로그인
router.post('/login',userController.login);

module.exports = router;