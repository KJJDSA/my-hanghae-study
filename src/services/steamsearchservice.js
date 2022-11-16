const GamesRepository = require("../repositories/gamesrepository");
const ReviewsRepository = require("../repositories/reviewsrepository");
const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs")
let { search } = require('../middlewares/log/searchlogger');
const path = require("path");
module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, filter }) => {
        try {
            console.log(filter)
            const keywords_deformed = []
            for (const keyword of keywords) {
                keywords_deformed.push({ name: { [Op.like]: "%" + keyword + "%" } })
            }
            const options = {
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
                        attributes: ["playtime_at_review", "language", "review", "timestamp_updated", "voted_up", "votes_up", "votes_funny", "weighted_vote_score"],
                        where: filter
                    },
                    {
                        model: Metascores,
                        attributes: ["name", "meta_score", "user_review"]
                    }
                ],
            }
            console.log("steamSearch")
            const { list } = await this.gamesRepository.findGames({ options });
            return { list }

        } catch (error) {
            throw error;
        }
    }

    searchLogger = async ({ user_id, keywords, list }) => {
        try {
            let key = keywords.join(' ')
            search.info({ label: 'GET:req /api/search/', message: user_id + "-" + key })
            // { name: { [Op.like]: "%keyword%" } } 각 키워드를 쿼리 형식으로 만들어주기
            const keywords_deformed = []
            // if (focus === "game") {
            // 검색하는 종류가 게임일경우 Games에서 finder
            for (const keyword of keywords) {
                keywords_deformed.push({ name: { [Op.like]: "%" + keyword + "%" } })
            }
            const appid_list = await this.gamesRepository.searchGamesId({ keywords_deformed });
            if (list !== undefined || appid_list !== undefined) {
                //로깅 txt
                const file_path = path.join(__dirname, '..', '..', 'logs', '/users/')
                let today = new Date();
                const search_result = {
                    date: today.toLocaleString(),
                    game_appid: appid_list.appid_list
                }
                fs.appendFileSync(file_path + user_id + ".log", JSON.stringify(search_result) + '\n', 'utf8')
            }
            return;
        } catch (error) {
            throw error;
        }
    }

};
