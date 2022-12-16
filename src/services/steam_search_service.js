const GamesRepository = require("../repositories/games_repository");
const ReviewsRepository = require("../repositories/reviews_repository");
let { search } = require('../middlewares/log/search_logger');
let { search_result } = require('../middlewares/log/search_result_logger');
let { explain } = require('../middlewares/log/search_result_logger');
require("dotenv").config();
module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, slice_start }) => {
        try {


            let option_keywords = {
                from: slice_start, size: 30,
                index: process.env.GAME,
                explain: true,
                body: {
                    query: {
                        bool: {
                            filter: [
                                {
                                    multi_match: {
                                        "query": keywords,
                                        // "fuzziness": 1, // multi_search 적용시 2~3배 느려짐
                                        "fields": [
                                            "name_eng.ngram_filter",
                                            "name.ngram_filter"
                                        ]
                                    },
                                },
                                { exists: { field: "img_url" } },
                            ],
                            should: [
                                { match_phrase: { "name.standard": keywords } }, // 구문 검색 up
                                { match: { "name.standard": keywords } }, // 노말 검색 up
                                { match: { "name_eng.ngram_filter": keywords } }, // ngram 키워드가 맞으면 up
                                { match: { type: { query: 'game', boost: 50 } } },// type이 game이면 + 
                            ]
                        }
                    }
                }
            }
            const game_list = await this.gamesRepository.findWithES(option_keywords);


            return game_list.hits.hits
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    steamAppidSearch = async ({ appid, slice_start, filter, filterExists, sort }) => {
        try {
            const game_option = {
                index: process.env.GAME,
                id: appid,
            }
            const game_doc = await this.gamesRepository.getWithES(game_option);
            const review_option = {
                from: slice_start, size: 30,
                index: process.env.REVIEW,
                body: {
                    sort,
                    query: {
                        bool: {
                            must: [
                                { match: { appid } }
                            ],
                        }
                    }
                }
            }
            // console.log(review_option.body.sort)
            // 필터 넣어주기
            if (filterExists === "true") {
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
                review_option.body.query.bool["filter"] = array
            }

            const review_list = await this.gamesRepository.findWithES(review_option);
            return { reviews: review_list.hits.hits, game_doc: game_doc._source }
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

    searchAutocomplete = async ({ value }) => {
        try {
            let option_keywords = {
                "from": 0, "size": 5,
                "_source": ['appid', 'name', 'img_url'],
                "index": process.env.GAME,
                "body": {
                    "query": {
                        "bool": {
                            filter: [
                                {
                                    multi_match: {
                                        "query": value,
                                        "fuzziness": 2, // 오타 검색이 가능해짐
                                        "fields": [
                                            "name_eng.autocomplete",
                                            "name.autocomplete"
                                        ]

                                    },
                                },
                                { exists: { field: "img_url" } },
                                { exists: { field: "review_score_desc" } },
                                { match: { type: { query: 'game' } } }, // type이 game이면 + 
                            ],
                            should: [
                                { match_phrase: { "name.standard": value } }, // 구문 검색 up
                                { match: { "name.standard": value } }, // 노말 검색 up
                            ]
                        }
                    }
                }
            }
            const game_list = await this.gamesRepository.findWithES(option_keywords);
            // console.log(game_list.hits.hits)
            return game_list.hits.hits
        } catch (error) {
            console.log(error)
        }
    }
}