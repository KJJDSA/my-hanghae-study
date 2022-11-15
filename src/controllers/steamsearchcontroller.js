const SteamSearchService = require("../services/steamsearchservice");
let logger = require('../middlewares/log/searchlogger');

module.exports = class SteamSearchController {
    steamSearchService = new SteamSearchService();
    steamSearch = async (req, res) => {
        try {
            //테스트코드
            const user="testUser";
            // 쿼리스트링으로 받음
            const { keyword } = req.query
            //로깅
            logger.info({label:'GET /api/search/',message:user+"-"+keyword})
            // console.log(keyword)
            const keywords = keyword.split(" ")
            const { game_list } = await this.steamSearchService.steamSearch({ keywords });
            res.status(200).json({
                data: game_list,
                // review_list: result.review_list
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ Type: error.name, Message: error.message });
        }

    }
};