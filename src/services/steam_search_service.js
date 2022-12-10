const GamesRepository = require("../repositories/games_repository");
const ReviewsRepository = require("../repositories/reviews_repository");
let { search } = require('../middlewares/log/search_logger');
let { search_result } = require('../middlewares/log/search_result_logger');
module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, slice_start }) => {
        try {
            let option_keywords = {
                from: slice_start, size: 30,
                index: "games_data_copy",
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        "name.ngrams": {
                                            "query": keywords,
                                            "fuzziness": 2 // 오타 검색이 가능해짐 
                                        }
                                    }
                                },
                                { exists: { field: "img_url" } },
                                { exists: { field: "review_score_desc" } },
                            ],
                            should: [
                                { match_phrase: { "name.standard": keywords } }, // 구문 검색 up
                                // { match_phrase_prefix: { "name.standard": keywords } }, // 구문검색을 하지만 마지막 요소는 접두사 
                                { match: { "name.standard": keywords } }, // 노말 검색 up
                                // { match: { "name.ngrams": keywords } }, // ngram 은 점수에는 아닌듯
                                { match: { type: 'game' } }, // type이 game이면 + 
                            ]
                        }
                    }
                }
            }
            const game_list = await this.gamesRepository.findWithES(option_keywords);
            // console.log(game_list)
            return game_list.hits.hits
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    steamAppidSearch = async ({ appid, slice_start, filter, filterExists, sort }) => {
        try {
            const game_option = {
                index: "games_data",
                id: appid,
            }
            const game_doc = await this.gamesRepository.getWithES(game_option);
            const review_option = {
                from: slice_start, size: 30,
                index: "reviews_datas",
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
                "index": "games_data",
                "body": {
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "match": {
                                        "name.autocomplete": {
                                            "query": value,
                                            "fuzziness": 2 // 오타 검색이 가능해짐 -- 그럼 ngram아니어도 이거면 되는거 아냐? 어?
                                        }
                                    }
                                },
                                { "exists": { "field": "img_url" } }, // 이미지가 있어야함
                                { "exists": { "field": "review_score_desc" } }, // 리뷰가 존재해야함
                            ],
                            "should": [
                                { "prefix": { "name.standard": { "value": value } } },
                                { "match": { "name.standard": value } }, // 노말 검색 up
                                { "match": { "type": 'game' } }, // type이 game이면 + 
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