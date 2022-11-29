const GamesRepository = require("../repositories/games_repository");
const ReviewsRepository = require("../repositories/reviews_repository");
const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");
let { errorLog } = require('../middlewares/log/error_logger');
const fs = require("fs").promises
let { search } = require('../middlewares/log/search_logger');
let { search_result } = require('../middlewares/log/search_result_logger');
const path = require("path");
const Sequelize = require('sequelize')

module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, filter, slice_start }) => {
        try {
            let option =
            {
                [Op.and]: [
                    Sequelize.literal(`MATCH (name) AGAINST ('${keywords}*' IN BOOLEAN MODE) `),
                    { review_score_desc: { [Op.not]: null } }
                ]
            }
            const slice_end = Number(slice_start) + 30
            let options = (option) => {
                return {
                    attributes: ["appid", "name", "review_score", "review_score_desc", "total_positive", 'total_negative', "img_url"],
                    where: option,
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
            }
            const game_list = await this.gamesRepository.findGames(options(option));
            if (!game_list.length) return false
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
                })
                    .sort((a, b) => { return b.Reviews["weighted_vote_score"] - a["weighted_vote_score"] })
            })
                .sort((a, b) => { return b[0].total_positive - a[0].total_positive })
                .slice(slice_start, slice_end) // 30개씩 끊어주기 - es 적용 전이라 db에 적용 안함
            return list;

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
            const game_list = await this.gamesRepository.findOneGames(options);
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
            })
                .sort((a, b) => { return b["Reviews.weighted_vote_score"] - a["Reviews.weighted_vote_score"] })
            return list
        } catch (error) {
            throw error;
        }
    }

    searchLogger = async ({ id, keywords, list }) => {
        try {
            const appids = list.map(game => {
                return game[0].appid
            })
            search.info({ label: 'GET:req /api/search/keyword', message: id + "-" + keywords })
            search_result.info({label:'GET:req /api/search/list', message:"userid:"+id+' appids:'+appids})
            // 배너를 통하거나 이미지를 클릭해 검색했을 경우 배열이 아닌 객체형태
            // if (!Array.isArray(keywords)) {
            //     // 검색된 appid는 딱 하나뿐
                
            //     // 차별화되는 데이터가 될 수 있으므로 유저가 only one 검색했다는 field를 추가해봄 
            //     search_result.info({label:'GET:req /api/search/only_one', message:appids})
            //     return;
            // } else {
            //     search_result.info({label:'GET:req /api/search/only_one', message:appids})
            // }
        } catch (error) {
            throw error;
        }
    }
}

