const UserRepository = require("../repositories/userrepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 11;
require("dotenv").config();
const env = process.env;

module.exports = class UserService {
  userRepository = new UserRepository();
  checkUser = async ({ id }) => {
    try {
      const user = await this.userRepository.findOne({ id });
      return { status: 200, message: user };
    } catch (error) {
      return { status: 400, message: "failed" };
    }
  };

  loginUser = async ({ user_id, password }) => {
    try {
      if (user_id === undefined || password === undefined) {
        return { status: 400, message: "INPUT ID OR PW" };
      }
      //bcrypt 이용, password 암호화 추가 
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash_password = await bcrypt.hash(password, salt);

      const login_user = await this.userRepository.findUserLogin({
        user_id,
        hash_password
      });
      if (login_user === undefined) {
        return { status: 400, message: "NOT FOUND" };
      }

      const token = jwt.sign({ user_id: login_user.user_id }, env.SECRETKEY);
      return { status: 201, message: "success", token };
    } catch (error) {
      console.log(error);
      return { status: 400, message: "faild" };
    }
  };

  createUser = async ({ user_id, password }) => {
    try {
      if (user_id === undefined || password === undefined) {
        return { status: 400, message: "INPUT ID OR PW" };
      }
      //bcrypt 이용, password 암호화 추가
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash_password = await bcrypt.hash(password, salt);

      await this.userRepository.createUser({ user_id, hash_password });

      return { status: 201, message: "success" };
    } catch (error) {
      return { status: 400, message: "faild" };
    }
  };
};
