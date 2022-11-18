const GamesRepository = require("../repositories/gamesrepository");
const ReviewsRepository = require("../repositories/reviewsrepository");
const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");
let {errorLog} = require('../middlewares/log/errorlogger');
const fs = require("fs").promises
let { search } = require('../middlewares/log/searchlogger');
const path = require("path");

module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, filter }) => {
        try {
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
            console.log(options)
            const { game_list } = await this.gamesRepository.findGames({ options });
            // console.log(game_list)
            // findAll 쓸데가 더 있어서 이사했어요
            const list = game_list.map(i => {
                const index = i.Reviews.map(j => {
                    const data = {
                        appid: i.dataValues.appid,
                        name: i.dataValues.name,
                        review_score: i.dataValues.review_score,
                        review_score_desc: i.dataValues.review_score_desc,
                        total_positive: i.dataValues.total_positive,
                        total_negative: i.dataValues.total_negative,
                        img_url: i.dataValues.img_url,
                        Reviews: {
                            playtime_at_review: j.playtime_at_review,
                            language: j.language,
                            review: j.review,
                            timestamp_updated: j.timestamp_updated,
                            voted_up: j.voted_up,
                            votes_up: j.votes_up,
                            votes_funny: j.votes_funny,
                            weighted_vote_score: j.weighted_vote_score,
                        },
                        Metascores: i.Metascores
                    }
                    return data
                })
                // console.log(index)
                return index
            }).sort((a, b) => { return b["Reviews.weighted_vote_score"] - a["Reviews.weighted_vote_score"] })
            // console.log(list)
            return { list }

        } catch (error) {
            throw error;
        }
    }

    searchLogger = async ({ id, keywords, list }) => {
        try {
            let key = keywords.join(' ')
            search.info({ label: 'GET:req /api/search/keyword', message: id + "-" + key })
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
                await fs.appendFile(file_path + id + ".log", JSON.stringify(search_result) + '\n', 'utf8')
                return;
            }
        } catch (error) {
            throw error;
        }
    }

};
