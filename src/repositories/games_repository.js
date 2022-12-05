const { Games } = require("../../models");
const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const client = require("../../ELK_connection");

module.exports = class SteamSearchRepository {


  findWithES = async (options) => {
    try {
      const list = await client.search(options);
      // console.log(review_list, "레포지");
      return list;
    } catch (error) {
      error.message = "Sequlize_FindGames_Error"
      error.status = 400;
      throw (error)
    }
  };

  findOneGames = async (options) => {
    try {
      const game_list = await Games.findOne(options)
      // console.log(game_list)
      return game_list;
    } catch (error) {
      throw error;
    }
  }


  // 사용하지 않음 - 삭제 논의 
  searchGamesId = async ({ keywords }) => {
    try {
      // 띄어쓰기한 모든 키워드가 존재하는 정확한 검색결과를 표시함
      const appid_list = await Games.findAll({
        raw: true,
        attributes: ["appid"],
        where: {
          [Op.and]: [
            Sequelize.literal(`MATCH (name) AGAINST ('${keywords}*' in boolean mode)`),
            { review_score_desc: { [Op.not]: null } }
          ]
        }
      })
      return { appid_list };
    } catch (error) {
      error.message = "Sequlize_SearchGamesId_Error"
      error.status = 400;
      throw (error)
    }
  }


  steamAppidSearch = async ({ }) => {

  }
  // // 추천 게임 appid 에서 가져오기
  // findRecommendedGames = async ({ keyword }) => {
  //   const data = await findOne({ raw: true, where: { appid: keyword } })
  //   return data
  // }
}