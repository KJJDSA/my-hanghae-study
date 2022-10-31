// services/users
const userRepository = require('../repositories/users');


class userService {
  constructor() {
    this.userRepository = new userRepository;
  };
}

module.exports = userService;