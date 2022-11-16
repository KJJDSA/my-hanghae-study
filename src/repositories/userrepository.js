const { Users } = require("../../models");

module.exports = class UserRepository {
  findOne = async ({ id }) => {
    try {
      
      const user = await Users.findOne({
        where: { id: id },
      });
      
      return user;
    } catch (error) {
      error.message="SQL_ERROR"
      throw(error)
    }
  };

  findUserLogin = async ({ user_id, hash_password }) => {
    try {
      
      const user = await Users.findOne({
        where: { userId: user_id, password: hash_password },
      });
      
      return user;
    } catch (error) {
      error.message="SQL_ERROR"
      throw(error)
    }
  };

  createUser = async ({ user_id, hash_password }) => {
    try {
      
      const user = await Users.create({
        userId: user_id,
        password: hash_password,
      });
      
      return user;
    } catch (error) {
      error.message="SQL_ERROR"
      throw(error)
    }
  };
};
