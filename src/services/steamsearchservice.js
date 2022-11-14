const SteamSearchRepository = require("../repositories/steamsearchrepository");
const { Op } = require("sequelize");
module.exports = class SteamSearchController {
    steamSearchRepository = new SteamSearchRepository();

    steamSearch = async ({ keywords }) => {
        try {
            // { name: { [Op.like]: "%keyword%" } } 각 키워드를 쿼리 형식으로 만들어주기
            const keywords_deformed = []
            for (const keyword of keywords) {
                keywords_deformed.push({ name: { [Op.like]: "%" + keyword + "%" } })
            }

            const { game_list_correct } = await this.steamSearchRepository.findGames({ keywords_deformed });


            // 찾아온 게임들의 appid를 추출, 배열화
            const appids = game_list_correct.map(game => game.appid)
            // 반복문으로 찾아옴
            const review_list = [];
            for (const appid of appids) {
                const { result } = await this.steamSearchRepository.findReviews({ appid })
                review_list.push(result)
            }

            return { game_list_correct, review_list };
        } catch (error) {
            throw error;
        }
    }
};
