const jwt = require("jsonwebtoken");
const { User } = require("../models");
// require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.locals.user.userId = 0;
      next();
    }
    const [authType, authToken] = (authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") throw { message: "옳지 않은 접근입니다." }

    res.locals.authToken = authToken;

    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
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