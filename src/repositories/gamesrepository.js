const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");

module.exports = class SteamSearchRepository {
  // 게임을 키워드로 찾고
  // 게임 리뷰를 각각 찾아오고
  findGames = async ({ options }) => {
    try {
      const game_list = await Games.findAll(options)
      // console.log(game_list)
      return { game_list };
    } catch (error) {
      throw error;
    }
  }

  searchGamesId = async ({ keywords_deformed }) => {
    try {
      // 띄어쓰기한 모든 키워드가 존재하는 정확한 검색결과를 표시함
      const appid_list = await Games.findAll({
        raw: true,
        attributes: ["appid"],
        where: {
          [Op.and]: [
            keywords_deformed,
            { review_score_desc: { [Op.not]: null } }
          ]
        }
      })
      return { appid_list };
    } catch (error) {
      throw error;
    }
  }

  // // 추천 게임 appid 에서 가져오기
  // findRecommendedGames = async ({ keyword }) => {
  //   const data = await findOne({ raw: true, where: { appid: keyword } })
  //   return data
  // }
}