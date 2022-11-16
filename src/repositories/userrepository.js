const { Users } = require("../../models");

module.exports = class UserRepository {
  findOne = async ({ id }) => {
    const user = await Users.findOne({
      where: { userid: id },
    });

    return user;
  };

  findUserLogin = async ({ user_id }) => {

    const user = await Users.findOne({
      where: { userid: user_id },
    });
    return user;
  };

  createUser = async ({ user_id, hash_password }) => {
    const user = await Users.create({
      userid: user_id,
      password: hash_password,
    });

    return user;
  };
};
