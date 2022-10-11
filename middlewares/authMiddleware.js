const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const SECRETKEY = "this-is-secretkey"

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = (authorization || "").split(" ");

  if (!tokenValue || tokenType !== "Bearer") { //토큰 검증부터
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }
  //refreshToken은 지금 아직 안쓰고 있는건가???? 맞네. 유효기간이라도 걸어두자.
  try {
    const { userId } = jwt.verify(tokenValue, SECRETKEY);
    Users.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }
};