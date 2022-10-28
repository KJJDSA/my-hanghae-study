const { User } = require('../models');


class userRepository {
  constructor() {
    this.User = User;
  }
}

module.exports = userRepository;