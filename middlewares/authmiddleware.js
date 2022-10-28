const jwt = require("jsonwebtoken");
const { User } = require("../models");
// require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers[process.env.COOKIE_NAME];
    if (!authorization) throw { message: "로그인 후 이용 가능한 기능입니다." };
    const [authType, authToken] = (authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") throw { message: "옳지 않은 접근입니다." }

    res.locals.authToken = authToken;

    const { userId } = jwt.verify(authToken, process.env.SECRET_KEY);
    User.findOne({ where: { userId } }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send({
      errorMessage: error.message
    });
  }
};