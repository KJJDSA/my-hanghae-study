const { Users } = require("../models");
const { Op } = require("sequelize");

module.exports = class SteamSearchRepository {
  steamSearch = async ({ keword }) => {
    try {
      const myInfo = await Users.findAll({ where: { keword } });
      return myInfo;
    } catch (error) {
      throw error;
    }

  }
}