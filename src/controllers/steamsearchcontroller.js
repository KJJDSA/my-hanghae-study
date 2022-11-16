const SteamSearchService = require("../services/steamsearchservice");

module.exports = class SteamSearchController {
    steamSearchService = new SteamSearchService();
    steamSearch = async (req, res, next) => {
        try {
            //테스트코드
            const user_id = res.locals.userId;

            // 쿼리스트링으로 받음

            const { keyword, language, voted_up } = req.query
            //로깅
            // search.info({ label: 'GET:req /api/search/', message: user_id + "-" + keyword })

            // console.log(keyword)
            const keywords = keyword.split(" ")
            let filter = language && voted_up ? { language, voted_up } : language ? { language } : { voted_up }
            const { list } = language || voted_up
                ? await this.steamSearchService.steamSearch({ keywords, filter })
                : await this.steamSearchService.steamSearch({ keywords })
            await this.steamSearchService.searchLogger({ user_id, keywords, list });
            return res.status(200).json({
                data: list,
            });
        } catch (error) {
            next(error)
            res.status(400).json({ Type: error.name, Message: error.message });
        }
    }
};