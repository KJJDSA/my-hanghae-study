const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const authorization = req.cookies[process.env.COOKIE_NAME];
    if (!authorization) {
      return res.redirect('/api/auth/kakao')
    }
    const [authType, authToken] = (authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") throw { message: "옳지 않은 접근입니다." }

    // res.locals.authToken = authToken;
    // console.log(authToken)
    const { userId } = jwt.verify(authToken, process.env.SECRET_KEY);
    Users.findOne({ where: { userId: userId.userId } }).then((user) => {
      res.locals.user = user;
      // console.log(user)
      next();
    });
  } catch (error) {
    res.status(401).send({
      errorMessage: error.message
    });
  }
};