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
            // console.log(keywords_deformed)
            const result = await this.steamSearchRepository.steamSearch({ keywords_deformed });
            return result;
        } catch (error) {
            throw error;
        }
    }
};
