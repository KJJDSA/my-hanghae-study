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
      error.message="Sequlize_FindOne_Error"
      error.status=400;
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
      error.message="Sequlize_FindUserLogin_Error"
      error.status=400;
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
      error.message="Sequlize_CreateUser_Error"
      error.status=400;
      throw (error)
    }
  };

  usercheck = async (id) => {
    try {
      
      const user = await Users.findOne({
        where: { id: id },
      });
      return user !== undefined
    } catch (error) {
      error.message="Sequlize_UserCheck_Error"
      error.status=400;
      throw (error)
    }
  }

  //option을 규칙으로 모든 유저 탐색
  findAllUser = async ({ options }) => {
    try {
      const user_list = await Users.findAll(options)
      // console.log(game_list)
      return { user_list };
    } catch (error) {
      error.message="Sequlize_FindAllUser_Error"
      error.status=400;
      throw (error)
    }
  }
};
