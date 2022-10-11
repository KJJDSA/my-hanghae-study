const express = require("express");
const { Op } = require("sequelize"); // sequelize 불러오기
const { User } = require("./models"); // models 모듈 
const jwt = require("jsonwebtoken")
const authMiddleware = require("./middlewares/authMiddleware");
const router = require("./routes");
const port = 8080

const app = express();

const SECRETKEY = "this-is-secretkey"

// 내정보 보기
app.get("/", (req, res) => {
  res.send("안녕하세요")
});
app.use(express.json());
app.use("/api", express.urlencoded({ extended: false }), router);

app.listen(port, () => {
  console.log(`${port}번으로 서버가 열렸어요`);
});