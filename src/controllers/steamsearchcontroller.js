const SteamSearchService = require("../services/steamsearchservice");

module.exports = class SteamSearchController {
    steamSearchService = new SteamSearchService();
    steamSearch = async (req, res) => {
        try {
            // 쿼리스트링으로 받음
            const { keyword, /** focus */ } = req.query
            const keywords = keyword.split(" ")
            const list = await this.steamSearchService.steamSearch({ keywords, /** focus */ });
            console.log(list)
            res.status(200).json({
                data: list,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ Type: error.name, Message: error.message });
        }
    }
};
