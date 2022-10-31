// controllers/user
const userService = require("../services/users");

class Users {
  constructor() {
    this.userService = new userService();
  }

  createUser = async (req, res) => {
  };
}

module.exports = Users;
