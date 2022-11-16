const SteamSearchService = require("../services/steamsearchservice");

module.exports = class SteamSearchController {
    steamSearchService = new SteamSearchService();
    steamSearch = async (req, res, next) => {
        try {
            //테스트코드
            const user_id = "1";
            // 쿼리스트링으로 받음

            const { keyword } = req.query
            //로깅
            // search.info({ label: 'GET:req /api/search/', message: user_id + "-" + keyword })

            // console.log(keyword)
            const keywords = keyword.split(" ")

            const { list} = await this.steamSearchService.steamSearch({ keywords });
            await this.steamSearchService.searchLogger({user_id,keywords,list});
            

            return res.status(200).json({
                data: list,
                // review_list: result.review_list
            });
        } catch (error) {
            next(error)
            res.status(400).json({ Type: error.name, Message: error.message });
        }

    }
};