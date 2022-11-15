const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");

module.exports = class SteamSearchRepository {
  // 게임을 키워드로 찾고
  // 게임 리뷰를 각각 찾아오고
  findGames = async ({ keywords_deformed }) => {
    try {
      // 띄어쓰기한 모든 키워드가 존재하는 정확한 검색결과를 표시함
      const game_list = await Games.findAll({
        attributes: ["appid", "name", "review_score", "review_score_desc", "total_positive", 'total_negative', "img_url"],
        where: {
          [Op.and]: [
            keywords_deformed,
            { review_score_desc: { [Op.not]: null } }
          ]
        },
        include: [
          {
            model: Reviews,
            attributes: [
              "playtime_at_review",
              "language",
              "review",
              "timestamp_updated",
              "voted_up",
              "votes_up",
              "votes_funny",
              "weighted_vote_score"]
          },
          {
            model: Metascores,
            attributes: ["name", "meta_score", "user_review"]
          }
        ],
      })
      const list = game_list.map(i => {
        // console.log(i.Game.Metascores[0].dataValues)
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
      return { list/** , game_list_incorrect*/ };
    } catch (error) {
      throw error;
    }
  }


  // findReviews = async ({ keywords_deformed }) => {
  //   try {
  //     // 띄어쓰기한 모든 키워드가 존재하는 정확한 검색결과를 표시함
  //     const game_list = await Reviews.findAll({
  //       attributes: [
  //         "playtime_at_review",
  //         "language",
  //         "review",
  //         "timestamp_updated",
  //         "voted_up",
  //         "votes_up",
  //         "votes_funny",
  //         "weighted_vote_score"],
  //       where: {
  //         [Op.and]: [
  //           keywords_deformed
  //         ]
  //       },
  //       include: [
  //         {
  //           model: Games,
  //           attributes: ["appid", "name", "review_score", "review_score_desc", "total_positive", 'total_negative', "img_url"],
  //           include: [{
  //             model: Metascores,
  //             attributes: ["name", "meta_score", "user_review"]
  //           }]
  //         },
  //       ],
  //     })
  //     const list = game_list.map(i => {
  //       // console.log(i.Game.Metascores[0].dataValues)
  //       const data = {
  //         appid: i.Game.dataValues.appid,
  //         name: i.Game.dataValues.name,
  //         review_score: i.Game.dataValues.review_score,
  //         review_score_desc: i.Game.dataValues.review_score_desc,
  //         total_positive: i.Game.dataValues.total_positive,
  //         total_negative: i.Game.dataValues.total_negative,
  //         img_url: i.Game.dataValues.img_url,
  //         Reviews: {
  //           playtime_at_review: i.dataValues.playtime_at_review,
  //           language: i.dataValues.language,
  //           review: i.dataValues.review,
  //           timestamp_updated: i.dataValues.timestamp_updated,
  //           voted_up: i.dataValues.voted_up,
  //           votes_up: i.dataValues.votes_up,
  //           votes_funny: i.dataValues.votes_funny,
  //           weighted_vote_score: i.dataValues.weighted_vote_score,
  //         },
  //         Metascores: i.Game.Metascores
  //       }
  //       // console.log(data)
  //       return data
  //     }).sort((a, b) => { return b["Reviews.weighted_vote_score"] - a["Reviews.weighted_vote_score"] })
  //     // console.log(game_list)
  //     return list;
  //   } catch (error) {
  //     throw error;
  //   }
  // }


}