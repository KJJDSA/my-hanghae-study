const SteamSearchService = require("../services/steamsearchservice");

module.exports = class SteamSearchController {
    steamSearchService = new SteamSearchService();
    steamSearch = async (req, res) => {
        try {
            // 쿼리스트링으로 받음
            const { keyword } = req.query
            // console.log(keyword)
            const keywords = keyword.split(" ")
            if (keywords.length < 1) throw { name: "옳지 않은 요청", message: "키워드 두개 이상 입력" }
            const result = await this.steamSearchService.steamSearch({ keywords });
            res.status(200).json({
                game_list_correct: result.game_list_correct,
                /** game_list_incorrect: result.game_list_incorrect*/
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ Type: error.name, Message: error.message });
        }
    }
};
