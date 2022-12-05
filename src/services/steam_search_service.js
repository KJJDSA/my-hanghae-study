const GamesRepository = require("../repositories/games_repository");
const ReviewsRepository = require("../repositories/reviews_repository");
let { search } = require('../middlewares/log/search_logger');
let { search_result } = require('../middlewares/log/search_result_logger');
module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords, slice_start }) => {
        try {
            // 게임 옵션
            var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            const keywords_patched = keywords.replace(reg, '').replace(/\s/g, '');

            // let tokens = keywords.split(' '),
            let ngrams = [];
            // for (let i = 0; i < ((keywords_patched.length - 2) + 1); i++) {
            //     let subset = [];
            //     for (let j = i; j < (i + 3); j++) {
            //         subset.push(keywords_patched[j]);
            //     }
            //     ngrams.push(subset.join(''))
            // }
            for (let i = 0; i < ((keywords_patched.length - 2) + 1); i++) {
                let subset = [];
                for (let j = i; j < (i + 4); j++) {
                    subset.push(keywords_patched[j]);
                }
                ngrams.push(subset.join(''))
            }
            console.log(ngrams.join(' '))
            let option_keywords = {
                from: slice_start, size: 30,
                index: "games_data",
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { "name.ngrams": keywords } },
                                { exists: { field: "img_url" } },
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
            console.log()
            const game_list = await this.gamesRepository.findWithES(option_keywords);
            console.log(game_list)
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