const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");

module.exports = class SteamSearchRepository {
  // 게임을 키워드로 찾고
  // 게임 리뷰를 각각 찾아오고
  findGames = async ({ options }) => {
    try {
      const game_list = await Games.findAll(options)
      // console.log(game_list)
      const list = game_list.map(i => {
        const index = i.Reviews.map(j => {
          const data = {
            appid: i.dataValues.appid,
            name: i.dataValues.name,
            review_score: i.dataValues.review_score,
            review_score_desc: i.dataValues.review_score_desc,
            total_positive: i.dataValues.total_positive,
            total_negative: i.dataValues.total_negative,
            img_url: i.dataValues.img_url,
            Reviews: {
              playtime_at_review: j.playtime_at_review,
              language: j.language,
              review: j.review,
              timestamp_updated: j.timestamp_updated,
              voted_up: j.voted_up,
              votes_up: j.votes_up,
              votes_funny: j.votes_funny,
              weighted_vote_score: j.weighted_vote_score,
            },
            Metascores: i.Metascores
          }
          return data
        })
        // console.log(index)
        return index
      }).sort((a, b) => { return b["Reviews.weighted_vote_score"] - a["Reviews.weighted_vote_score"] })
      return { list };
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

}