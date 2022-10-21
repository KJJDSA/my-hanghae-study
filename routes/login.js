const express = require('express');
const router = express.Router();

//user.controller로 부터 module을 받아와서 usersController에 할당
const UserController = require('../controllers/users.controller')
const usersController = new UserController();

router.get('/', (req, res) => {
  res.send("login")
})

//user를 생성하는 라우터 (회원가입)
router.post('/', usersController.createUser);

//로그인 라우터
router.post('/userlogin', usersController.userLogin);


module.exports = router;