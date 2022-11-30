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
                                { exists: { field: "short_description" } },
                            ],
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
            const appids = list.map(game => {
                return game[0].appid
            })
            search.info({ label: 'GET:req /api/search/keyword', message: id + "-" + keywords })
            search_result.info({ label: 'GET:req /api/search/list', message: "userid:" + id + ' appids:' + appids })
            // 배너를 통하거나 이미지를 클릭해 검색했을 경우 배열이 아닌 객체형태

            if (typeof keywords === 'object') {
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
                // list === [[게임1 리뷰][게임2 리뷰]. . .] map으로 검색결과 가져올 수 있음
                const appids = list.map(game => {
                    return game[0].appid
                })
                search.info({ label: 'GET:req /api/search/keyword', message: id + "-" + keywords })
                // fulltext 쿼리로 변경 --- 사용x list에서 가져올 수 있음
                // const appid_list = await this.gamesRepository.searchGamesId({ keywords });
                if (list !== undefined || appid_list !== undefined) {
                    //로깅 txt
                    const file_path = path.join(__dirname, '..', '..', 'logs', '/users/')
                    let today = new Date();
                    const search_result = {
                        date: today.toLocaleString(),
                        search_type: 'keywords',
                        game_appid: appids
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


let options = (option, index) => {
    return {
        index: index,
        body: {
            query: option
        },
    }
}