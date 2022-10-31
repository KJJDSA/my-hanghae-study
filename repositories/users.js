// repositories/users
const { Users } = require("../models");

class userRepository {
  constructor() {
    this.User = Users;
  }
}

module.exports = userRepository;
