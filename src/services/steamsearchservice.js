const GamesRepository = require("../repositories/gamesrepository");
const ReviewsRepository = require("../repositories/reviewsrepository");
const { Op } = require("sequelize");
module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, focus }) => {
        try {
            // { name: { [Op.like]: "%keyword%" } } 각 키워드를 쿼리 형식으로 만들어주기
            const keywords_deformed = []
            // if (focus === "game") {
            // 검색하는 종류가 게임일경우 Games에서 finder
            for (const keyword of keywords) {
                keywords_deformed.push({ name: { [Op.like]: "%" + keyword + "%" } })
            }
            const game_list = await this.gamesRepository.findGames({ keywords_deformed });
            return game_list
            // }
            // else {
            //     // 검색하는 종류가 리뷰일경우 Reviews에서 finder
            //     for (const keyword of keywords) {
            //         keywords_deformed.push({ review: { [Op.like]: "%" + keyword + "%" } })
            //     }
            //     const game_list = await this.gamesRepository.findReviews({ keywords_deformed });
            //     return game_list
            // }
        } catch (error) {
            throw error;
        }
    }
};
