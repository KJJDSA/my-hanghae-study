const GamesRepository = require("../repositories/games_repository");
const UserRepository = require("../repositories/user_repository");
require("dotenv").config();
const env = process.env;
// 임시 코드 repository 

class VectorSimilarity {
    cosinSimilarity = async (unit_vec1, unit_vec2, value) => {
        let cosin = 0;
        for (let i in unit_vec1) {
            if (unit_vec2[i] !== undefined) {
                cosin += unit_vec1[i] * unit_vec2[i];
            }
            if (cosin > value) {
                return false;
            }
        }
        return cosin;
    }
}

module.exports = class UserAnalyzeService {
    gamesRepository = new GamesRepository();
    userRepository = new UserRepository();
    // userAnalyzeRepository = new UserAnalyzeRepository();
    bestGameList = async () => {
        try {

            let gameList = new Object();
            const now = new Date();
            const year = now.getFullYear(); // 년
            const month = now.getMonth();   // 월
            const day = now.getDate();      // 일
            const hours = now.getHours(); // 시
            const minutes = now.getMinutes();  // 분
            const seconds = now.getSeconds();  // 초
            const week = new Date(year, month, day - 7, hours, minutes, seconds).toISOString();
            const option = {
                index: env.LOG,
                body: {
                    query: {
                        bool: {
                            must_not: [
                                { match: { only: "true" } },
                                {
                                    range: {
                                        '@timestamp': {
                                            lte: week,
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
            const filelist = await this.userRepository.findWithES(option);
            if (filelist.hits.hits.length === 0) {
                return [];
            }
            for (let file of filelist.hits.hits) {

                //es
                let appid_list = file._source.appids.split(',');
                for (let ele of appid_list) {
                    if (gameList[ele] === undefined) {
                        gameList[ele] = 1
                    } else {
                        gameList[ele]++;
                    }
                }

            }
            //es
            let result = [];
            for (let appid in gameList) {
                result.push([appid, gameList[appid]])
            }
            result.sort((a, b) => {
                return b[1] - a[1]
            })
            if (result.length > 10) {
                result = result.filter((ele, index) => {
                    return index < 10
                })
            }
            let result_game = [];
            for (let appid of result) {
                const option_appid = {
                    index: env.GAME,
                    body: {
                        query: {
                            bool: {
                                must: [
                                    { match: { appid: appid[0] } }
                                ],
                            }
                        }
                    }
                }
                let game_info = (await this.gamesRepository.findWithES(option_appid)).hits.hits[0]._source;
                game_info['see'] = appid[1];
                result_game.push(game_info)
            }
            return result_game
        } catch (error) {
            throw (error)
        }
    }

    userLikeGame = async ({ user_id }) => {
        try {
            const option_user = {
                index: env.USER_INFO,
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { userid: user_id } },
                            ]
                        }
                    }
                }
            }
            //분석된 데이터 가지고오기
            const user = await this.userRepository.findWithES(option_user);
            const now = new Date();
            const year = now.getFullYear(); // 년
            const month = now.getMonth();   // 월
            const day = now.getDate();      // 일
            const hours = now.getHours(); // 시
            const today = new Date(year, month, day, hours).toISOString();
            let updatedAt = '2022-11-01T15:00:00.000Z'
            if (user.hits.hits.length !== 0) {
                updatedAt = user.hits.hits[0]._source.updatedAt;
            }

            if (today <= updatedAt) {
                //업데이트를 이미 실행하여 데이터가 업데이트됨
                return { status: 200, message: "not_update" }
            }
            const option = {
                index: env.LOG,
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { userid: user_id } },
                            ],
                            must_not: [
                                { match: { only: "false" } },
                                {
                                    range: {
                                        '@timestamp': {
                                            lte: updatedAt,
                                            gt: today
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
            const list = await this.userRepository.findWithES(option);
            if (list.hits.hits.length === 0) {
                //log를 이용해서 유저의 검색기록을 찾아올때 검색된 로그가 없을경우
                //시간 업데이트 필요
                return { status: 200, message: "not_update" }
            }
            const game_list = [];
            const appid_list = [];
            for (let ele of list.hits.hits) {
                const appid = ele._source.appids
                //appid 중첩 확인
                let appid_check = true;
                appid_list.map(ele => {
                    if (ele == appid) {
                        appid_check = false
                    }
                })
                if (appid_check) {
                    appid_list.push(appid)
                }
                const option_appid = {
                    index: env.GAME,
                    body: {
                        query: {
                            bool: {
                                must: [
                                    { match: { appid: appid } },
                                    { exists: { field: "categories" } },
                                ],
                            }
                        }
                    }
                }
                const game_info = await this.gamesRepository.findWithES(option_appid);
                game_list.push({
                    appid: appid,
                    categories: game_info.hits.hits[0]._source.categories
                })
            }
            const game_vector = new Object();

            // category : 게임의 카테고리가 쌓여있는 [{id:,description:},{..},...]형태의 배열
            for (let ele of game_list) {
                //game_vector 등록 되어 있지 않으면 1로 초기화아니면 +1
                for (let category of ele.categories) {
                    if (game_vector[category.id] === null || game_vector[category.id] === undefined) {
                        game_vector[category.id] = 1;
                    } else {
                        game_vector[category.id]++;
                    }
                }
            }
            // game_vector : 선호하는 게임의 카테고리 벡터

            //userAnalyze : 유저가 가지고 있는 합벡터, 단위 벡터
            //해당 유저의 vector를 가지고온다.
            let user_vector = {};
            //벡터가 없을경우 빈 객체로 준다.
            if (user.hits.hits.length !== 0) {
                for (let i in user.hits.hits[0]._source.vector) {
                    user_vector.i = user.hits.hits[0]._source.vector[i]
                }
            }

            //유저의 벡터와 게임의 벡터를 더한다.
            // 해당 유저에게 벡터가 없을경우 등록
            let sum_pow_vector_value = 0;
            for (let cate in game_vector) {
                if (user_vector[cate] === null || user_vector[cate] === undefined) {
                    user_vector[cate] = game_vector[cate]
                } else {
                    user_vector[cate] += game_vector[cate]
                }
                sum_pow_vector_value += Math.pow(game_vector[cate], 2);
            }

            //단위 벡터로 만들어
            let new_unit_vector = {};
            for (let ele in user_vector) {
                new_unit_vector[ele] = Math.round(user_vector[ele] / Math.sqrt(sum_pow_vector_value) * 100) / 100
            }

            // 벡터 가공
            let result_vector = [];
            for (let i = 0; i < 53; i++) {
                if (user_vector[i] === undefined) {
                    result_vector[i] = 0;
                } else {
                    result_vector[i] = user_vector[i];
                }
            }
            let result_unit_vector = [];
            for (let i = 0; i < 53; i++) {
                if (user_vector[i] === undefined) {
                    result_unit_vector[i] = 0;
                } else {
                    result_unit_vector[i] = new_unit_vector[i];
                }
            }

            //새롭게 만들어진 정보를 업데이트-수정 or 만들기
            let success = true;
            if (user.hits.hits.length !== 0) {
                const option_vector = {
                    index: env.USER_INFO,
                    id: user.hits.hits[0]._id,
                    body: {
                        doc: {
                            vector: result_vector,
                            unit_vector: result_unit_vector,
                            appid_list: appid_list,
                            updatedAt: today
                        }
                    }
                }
                success = await this.userRepository.updateWintES(option_vector)
            } else {
                const option_vector = {
                    index: env.USER_INFO,
                    body: {
                        userid: user_id,
                        vector: result_vector,
                        unit_vector: result_unit_vector,
                        appid_list: appid_list,
                        updatedAt: today
                    }
                }
                success = await this.userRepository.insertWithES(option_vector)
            }

            return success === true ? { status: 200, message: "success" } : { status: 200, message: "not_update" }
        } catch (error) {
            error.status = 400
            error.message = "faild"
            throw (error)
        }
    }

    UserBestList = async ({ user_id }) => {
        try {
            let option_userid = {
                index: env.USER_INFO,
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { userid: user_id } },
                            ],
                        }
                    }
                }
            }
            let mine_vector = await this.userRepository.findWithES(option_userid)
            if (mine_vector.hits.hits.length === 0) {
                //분석데이터가 없을때 업데이트
                if (userLikeGame({ user_id }).status !== 200) {
                    //해당로그 없음으로
                    return false;
                }
            }
            //자신을 뺀 유저 리스트(범위 축소)
            option_userid = {
                index: env.USER_INFO,
                body: {
                    query: {
                        bool: {
                            must_not: [
                                { match: { userid: user_id } },
                            ],
                        }
                    }
                }
            }
            let target_list = await this.userRepository.findWithES(option_userid)
            //각 유저의 벡터 정보를 받아온다.
            const vectorSimilarity = new VectorSimilarity();
            let cosin_similarity = [];
            let like_games = {};
            if (target_list.hits.hits.length === 0) {
                return false;
            }
            for (let target_info of target_list.hits.hits) {
                let target = target_info._source
                let knn_value = 0.8;
                //코사인 유사도 계산
                let cosin = await vectorSimilarity.cosinSimilarity(mine_vector.hits.hits[0]._source.unit_vector, target.unit_vector, knn_value);
                if (cosin === false) {
                    continue;
                }
                cosin = Math.round(cosin * 100) / 100;
                cosin_similarity.push({
                    userid: target.userid,
                    cosin
                })
                let appid_list = target.appid_list;
                for (let appid of appid_list) {
                    if (like_games[appid] === undefined || like_games[appid] === null) {
                        like_games[appid] = cosin;
                    } else {
                        like_games[appid] += cosin;
                    }
                }
            }
            let result = [];
            for (let appid in like_games) {
                result.push([appid, like_games[appid]])
            }
            result.sort((a, b) => {
                return b[1] - a[1]
            })
            if (result.length > 10) {
                result = result.filter((ele, index) => {
                    return index < 10
                })
            }
            let game_list = [];
            for (let appid of result) {
                const option_appid = {
                    index: env.GAME,
                    body: {
                        query: {
                            bool: {
                                must: [
                                    { match: { appid: appid[0] } }
                                ],
                            }
                        }
                    }
                }
                game_list.push((await this.gamesRepository.findWithES(option_appid)).hits.hits[0]);
            }
            return game_list;
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    newGame = async () => {

        // 다른 곳에 저장되어있던 appid 리스트 받는다.
        let option = {
            index: "new_game",
            // 임시 인덱스(존재안함)
            body: {
                query: {
                    bool: {
                    }
                }
            }
        }

        let get_new_game_list = await this.gamesRepository.findWithES(option)

        // 리스트가 없으면 바로 종료
        if (get_new_game_list.hits.hits.length === 0) {
            return [];
        }

        let game_info_list = [];
        for (let appid of get_new_game_list.hits.hits[0]._source.appid_list) {
            const option_appid = {
                index: env.GAME,
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { appid: appid } }
                            ],
                        }
                    }
                }
            }
            const game_info = await this.gamesRepository.findWithES(option_appid);
            game_info_list.push(game_info.hits.hits[0]._source);
        }
        game_info_list.sort((a, b) => {
            if (b.total_positive === a.total_positive) {
                return a.total_negative - b.total_negative
            } else {
                return b.total_positive - a.total_positive
            }
        })

        game_info_list.filter((ele, index) => {
            return index <= 10;
        })


        return game_info_list;
    }
};
