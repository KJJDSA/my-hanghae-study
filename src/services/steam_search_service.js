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

    steamSearch = async ({ keywords, slice_start }) => {
        try {
            // 게임 옵션
            let option_keywords = {
                from: slice_start, size: 30,
                index: "game_data",
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { name: keywords } },
                                { exists: { field: "review_score_desc" } },
                            ],
                            should: [
                                { match_phrase: { name: keywords } }, // 키워드 전체 구문이 있으면 +
                                { match: { name: keywords } }, // 각 요소가 맞는게 있으면 +
                                { match: { type: 'game' } }, // type이 game이면 + 
                            ]
                        }
                    }
                }
            }
            // console.log(option_keywords)
            const game_list = await this.gamesRepository.findWithES(option_keywords);
            // let games = [];
            // for (let i = 0; i < game_list.hits.hits.length; i++) {
            //     games.push(game_list.hits.hits[i]._source.appid + "");
            // }
            return game_list.hits.hits
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    steamAppidSearch = async ({ appid, slice_start, filter, filterExists }) => {
        try {
            const option_appid = {
                from: slice_start, size: 30,
                index: "review_data",
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { appid } }
                            ],
                        }
                    }
                }
            }
            // 필터 넣어주기
            if (filterExists) {
                let array = []
                for (let key in filter) {
                    // key 는 []로 감싸야 한다.
                    if (filter[key] !== 'none') {
                        let obj1 = {}
                        let obj2 = {}
                        obj2[key] = filter[key]
                        obj1["match"] = obj2
                        array.push(obj1)
                    }
                }
                option_appid.body.query.bool["filter"] = array
            }

            const review_list = await this.gamesRepository.findWithES(option_appid);
            // console.log(review_list.hits.hits)
            return review_list.hits.hits
        } catch (error) {
            throw error;
        }
    }

    searchLogger = async ({ id, keywords, list }) => {
        try {
            let appids = list
            if (typeof (list) === 'object') {
                appids = list.map(game => {
                    return game._source.appid
                })
            }
            if (typeof keywords === 'object') {
                search.info({ label: 'GET:req /api/search/keyword', message: id + "-appid:" + keywords.value })
                search_result.info({ label: 'GET:req /api/search/list', message: "userid:" + id + ' appids:' + appids + " only:true" })
            } else {
                search.info({ label: 'GET:req /api/search/keyword', message: id + "-" + keywords })
                search_result.info({ label: 'GET:req /api/search/list', message: "userid:" + id + ' appids:' + appids + " only:false" })
            }
        } catch (error) {
            throw error;
        }
    }
}