const express = require('express');
const router = express.Router();
// const authmiddleware = require('../middlewares/auth-middleware');

const UserController = require('../controllers/usercontroller');
const userController = new UserController();


//회원가입
router.post('/signup', userController.signUp);

//로그인
router.get('/login', function (req, res) {
  res.render("login.html");
});
router.post('/login', userController.login);

//userId로 회원가입이 되어있는지 체크하는 테스트 코드
router.post('/check_up', userController.checkUser);
module.exports = router;