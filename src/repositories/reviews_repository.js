const { Reviews } = require("../../models");
module.exports = class ReviewsRepository {
    findReviews = async ({ appid }) => {
    try {
      // 리뷰 검색. weighted_vote_score 순으로 정렬함
      const result = await Reviews.findAll({
        raw: true,
        order: [['weighted_vote_score', 'DESC']],
        where: { appid }
      })
      return { result };
    } catch (error) {
      error.message="Sequlize_FindReviews_Error"
      error.status=400;
      throw (error)
    }
  }
}