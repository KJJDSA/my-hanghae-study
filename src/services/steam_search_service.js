const GamesRepository = require("../repositories/games_repository");
const ReviewsRepository = require("../repositories/reviews_repository");
const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");
let { errorLog } = require('../middlewares/log/error_logger');
const fs = require("fs").promises
let { search } = require('../middlewares/log/search_logger');
const path = require("path");
const Sequelize = require('sequelize')

module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, filter }) => {
        try {
            let options = {
                attributes: ["appid", "name", "review_score", "review_score_desc", "total_positive", 'total_negative', "img_url"],
                where:
                {
                    [Op.and]: [
                        Sequelize.literal(`MATCH (name) AGAINST ('${keywords}*' in boolean mode)`),
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
                        attributes: ["metacritic_name", "meta_score", "user_review"]
                    }
                ],
            }
            // console.log(options)
            const { game_list } = await this.gamesRepository.findGames({ options });
            // console.log(game_list)
            if (!game_list.length) return false
            // findAll 쓸데가 더 있어서 이사했어요
            const list = game_list.map(i => {
                return i.Reviews.map(j => {
                    return {
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
                }).sort((a, b) => { return b.Reviews["weighted_vote_score"] - a["weighted_vote_score"] })
            }).sort((a, b) => { return b[0].total_positive - a[0].total_positive })
            // console.log(list)
            return list

        } catch (error) {
            throw error;
        }
    }

    steamAppidSearch = async ({ keyword }) => {
        try {
            let options = {
                attributes: ["appid", "name", "review_score", "review_score_desc", "total_positive", 'total_negative', "img_url"],
                where: { appid: keyword },
                include: [
                    {
                        model: Reviews,
                        attributes: ["playtime_at_review", "language", "review", "timestamp_updated", "voted_up", "votes_up", "votes_funny", "weighted_vote_score"],
                    },
                    {
                        model: Metascores,
                        attributes: ["metacritic_name", "meta_score", "user_review"]
                    }
                ],
            }
            const { game_list } = await this.gamesRepository.findOneGames({ options });
            if (!game_list) return false
            // console.log(game_list)
            const list = game_list.Reviews.map(j => {
                const data = {
                    appid: game_list.dataValues.appid,
                    name: game_list.dataValues.name,
                    review_score: game_list.dataValues.review_score,
                    review_score_desc: game_list.dataValues.review_score_desc,
                    total_positive: game_list.dataValues.total_positive,
                    total_negative: game_list.dataValues.total_negative,
                    img_url: game_list.dataValues.img_url,
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
                    Metascores: game_list.Metascores
                }
                return data
            }).sort((a, b) => { return b["Reviews.weighted_vote_score"] - a["Reviews.weighted_vote_score"] })
            // console.log(list)
            return list

        } catch (error) {
            throw error;
        }
    }

    searchLogger = async ({ id, keywords, list }) => {
        try {
            // 배너를 통하거나 이미지를 클릭해 검색했을 경우 배열이 아닌 객체형태
            if (!Array.isArray(keywords)) {
                // 검색된 appid는 딱 하나뿐
                // 차별화되는 데이터가 될 수 있으므로 유저가 only one 검색했다는 field를 추가해봄 
                const file_path = path.join(__dirname, '..', '..', 'logs', '/users/')
                let today = new Date();
                const search_result = {
                    date: today.toLocaleString(),
                    search_type: keywords.type,
                    game_appid: keywords.value
                }
                await fs.appendFile(file_path + id + ".log", JSON.stringify(search_result) + '\n', 'utf8')
                search.info({ label: 'GET:req /api/search/log', message: id + "-success" })
                return;
            } else {
                let key = keywords.join(' ')
                search.info({ label: 'GET:req /api/search/keyword', message: id + "-" + key })
                // fulltext 쿼리로 변경
                const appid_list = await this.gamesRepository.searchGamesId({ keywords });
                if (list !== undefined || appid_list !== undefined) {
                    //로깅 txt
                    const file_path = path.join(__dirname, '..', '..', 'logs', '/users/')
                    let today = new Date();
                    const search_result = {
                        date: today.toLocaleString(),
                        search_type: 'keywords',
                        game_appid: appid_list.appid_list
                    }
                    await fs.appendFile(file_path + id + ".log", JSON.stringify(search_result) + '\n', 'utf8')
                    search.info({ label: 'GET:req /api/search/log', message: id + "-success" })
                    return;
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

