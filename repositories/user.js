const { Users } = require('../models');

class UserRepository {
  createUser = async ({ nickname, password, phone }) => {
    const createUser = await Users.create({ nickname, password, phone });

    return createUser;
  };

  findSameNickname = async ({ nickname }) => {
    const userData = await Users.findOne({ where: { nickname } });

    return userData;
  };
  //로그인 
  findUser = async ({ nickname }) => {
    const user = await Users.findOne({ where: { nickname } })
    return user
  }
}

module.exports = UserRepository;