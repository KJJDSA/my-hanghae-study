const express = require('express'); //express 임포트
const router = express.Router(); // express 의존함수 router임포트
const authMiddleware = require("../middlewares/authMiddleware");
const SECRETKEY = "this-is-secretkey"
const { Op } = require("sequelize"); // sequelize 불러오기
const { Users, Posts } = require("../models"); // models 모듈 
const jwt = require("jsonwebtoken")
// const Joi = require("joi");

// const postUsersSchema = Joi.object({
//   nickname: Joi.string().required(),
//   password: Joi.string().required(),
//   confirmPassword: Joi.string().required(),
// });
const nicknameRegex = /^[0-9a-zA-Z]{3,}$/;
const passwordRegex = /^[0-9a-zA-Z`~!@#$%^&*()-_=+]{4,}$/;

//회원가입 SQL
router.post("/", async (req, res) => {
  const { nickname, password, confirm } = req.body;

  if (!nicknameRegex.test(nickname)) {
    res.status(400).send({
      errorMessage: "닉네임은 3자 이상의 문자와 숫자만 허용됩니다.",
    });
    return;
  }
  if (!passwordRegex.test(password)) {
    res.status(400).send({
      errorMessage: "비밀번호는 4자 이상의 문자와 숫자, 특수기호(`~!@#$%^&*()-_=+) 를 포함해야합니다.",
    });
    return;
  }
  if (password === nickname) {
    res.status(400).send({
      errorMessage: "닉네임과 비밀번호를 다르게 입력해주세요!",
    });
    return;
  }
  if (password !== confirm) {
    res.status(400).send({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  // email or nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
  const existsUsers = await Users.findAll({
    where: {
      [Op.or]: [{ nickname }],
    },
  });
  if (existsUsers.length) {
    res.status(400).send({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  await Users.create({ nickname, password });
  res.status(201).send({ message: " 회원가입을 축하합니다 " });
});

// 로그인 SQL
router.post("/auth", async (req, res) => {
  const { nickname, password } = req.body;
  if (req.headers.authorization) {
    return res.status(400).send({
      errorMessage: "이미 로그인이 되어있습니다.",
    });
  }
  const user = await Users.findOne({
    where: {
      nickname,
    },
  });


  if (!user || password !== user.password) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
    });
    return;
  }

  res.send({
    token: jwt.sign({ userId: user.userId }, SECRETKEY, { expiresIn: '1d' }),
    // 지금까지 유효기간 없는 토큰을 주고 있었구나. 이러면 안되지.
  });
});

// 내정보 보기
router.get("/me", authMiddleware, async (req, res) => {
  const { userId, nickname } = res.locals.user; // SQL 넘어와도 안바꿔도 괜찮다. 완성된 값을 받은거라서. 
  const postlist = await Posts.findAll({ //마이페이지에 내가 쓴 글도 받아온다.
    userId,
    attributes: { exclude: ["content"] }
  });
  res.send({
    data: [
      { user: nickname }, { myPost: postlist } //닉네임과 내가 쓴 글목록을 보낸다.
    ]
  });
});


module.exports = router;