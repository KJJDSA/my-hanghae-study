const UsersService = require('../services/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const { InvalidParamsError } = require('../exceptions/exception');
require('dotenv').config();

class Users {
  constructor() {
    this.UsersService = new UsersService();
  }

  //회원가입
  createUser = async (req, res) => {
    try {
      const { loginId, nickname, password, confirm, profileImgUrl, intro } = req.body;

      //입력값이 없을때 걸러주는거
      if (!loginId || !nickname || !password) {
        throw { message: '입력값을 확인해 주세요' };
      }
      const bcrypt = require('bcrypt');

      const hash = await bcrypt.hash(password, 10);

      const user = await this.UsersService.createUser({
        loginId,
        nickname,
        hash,
        confirm,
        profileImgUrl,
        intro,
      });

      res.status(201).json({
        data: {
          loginId,
          nickname,
        },
      });
    } catch (error) {
      console.log(error.name + ':' + error.message);
      return res.status(error.status || 400).send({
        errorMessage: error.message || `회원가입에 실패했습니다.`,
      });
    }
  };

  //로그인
  userLogin = async (req, res, next) => {
    try {
      //바디에서 아이디 비번을 가져와서
      const { loginId, password } = req.body;
      const login = await this.UsersService.userLogin({ loginId, password });
      console.log(login);
      const authorization = req.headers.authorization;

      //login이 null이면 가입 정보를 못 찾음.
      if (login === null) throw { Message: '가입 정보를 찾을 수 없습니다' };

      const token = jwt.sign({ userId: login.userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '600m',
      });

      //header에 정보가 있으면 "이미 로그인이 되어있습니다." 반환
      if (authorization) throw { message: '이미 로그인이 되어 있습니다.' };

      //token 값을 userId로 생성
      res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expiresIn: '600m' }); //hh99 , bearer : token값 엄청긴거
      res.send({ token, nickname: login.nickname });
    } catch (error) {
      console.log(error.name + ':' + error.message);
      return res.status(error.status || 400).send({
        errorMessage: error.message || '로그인에 실패했습니다.',
      });
    }
  };
}

module.exports = Users;
