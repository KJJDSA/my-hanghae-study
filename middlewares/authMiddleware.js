const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res, next) => {
  try {
    const cookies = req.cookies[process.env.COOKIE_NAME];
    // console.log(cookies)
    // console.log(cookies)
    if (!cookies) {
      const { loginId, nickname, password } = req.body;
      // console.log(loginId, nickname, password)
      const createUser = await User.create({ loginId, nickname, password })
      const token = jwt.sign({ userId: createUser.userId }, process.env.SECRET_KEY)
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 600);
      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires });
      res.locals.user = createUser
      next();

    } else {
      const tokenValue = cookies.split(' ')[1];
      const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
      const user = await User.findByPk(userId);

      res.locals.user = user;
      // console.log(user)
      next();
    }
  } catch (error) {
    console.log(error.name + ':' + error.message)
    return res.status(403).send({
      errorMessage: '짜가 authMiddleware 에러~'
    });
  }
};
