const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");

module.exports = class SteamSearchRepository {
  // 게임을 키워드로 찾고
  // 게임 리뷰를 각각 찾아오고
  findGames = async ({ keywords_deformed }) => {
    try {
      // 띄어쓰기한 모든 키워드가 존재하는 정확한 검색결과를 표시함
      const game_list = await Games.findAll({
        raw: true,
        where: {
          [Op.and]: [
            keywords_deformed,
            { review_score_desc: { [Op.not]: null } }
          ]
        },
        include: [
          { model: Reviews },
          {
            model: Metascores,
            attributes: ["meta_score", "user_review"]
          }
        ],

      })
      // // 키워드 중 하나라도 맞으면 검색결과를 불러오게 하려했으나 'the', 'a' 같은 건 너무 길게 불러옴. 봉인! 
      // const game_list_incorrect = await Games.findAll({
      //   raw: true,
      //   where: {
      //     [Op.or]: keywords_deformed
      //   }
      // })
      return { game_list/** , game_list_incorrect*/ };
    } catch (error) {
      throw error;
    }
  }

}