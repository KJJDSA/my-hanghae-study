const { Users } = require("../../models");

module.exports = class UserRepository {
  findOne = async ({ id }) => {
    const user = await Users.findOne({
      where: { id: id }
    });

    return user;
  }

  findUserLogin = async ({ user_id, hash_password }) => {
    const user = await Users.findOne({
      where: { userId: user_id, password: hash_password }
    });

    return user;
  };

  createUser = async ({ user_id, hash_password }) => {

    const user = await Users.create({
      userId: user_id,
      password: hash_password
    });

    return user;
  };
};