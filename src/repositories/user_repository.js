const { LOCK } = require("sequelize");
const { Users } = require("../../models");

module.exports = class UserRepository {
  findOne = async ({ id }) => {
    try {

      const user = await Users.findOne({
        where: { userid: id },
      });

      return user;
    } catch (error) {
      error.message = "SQL_ERROR"
      throw (error)
    }
  };

  findUserLogin = async ({ user_id, hash_password }) => {
    try {
      const user = await Users.findOne({
        where: { userid: user_id },
      });
      return user;
    } catch (error) {
      error.message = "SQL_ERROR"
      throw (error)
    }
  };

  createUser = async ({ user_id, hash_password }) => {
    try {

      const user = await Users.create({
        userid: user_id,
        password: hash_password,
      });

      return user;
    } catch (error) {
      error.message = "SQL_ERROR"
      throw (error)
    }
  };

  usercheck = async (id) => {
    const user = await Users.findOne({
      where: { id: id },
    });
    return user !== undefined
  }
};
