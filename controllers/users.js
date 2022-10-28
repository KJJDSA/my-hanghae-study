const userService = require("../services/users");
//머지 확인용 주석입니다 지워주세요

class Users {
  constructor() {
    this.userService = new userService();
  }

  createUser = async (req, res) => {};
}

module.exports = Users;
