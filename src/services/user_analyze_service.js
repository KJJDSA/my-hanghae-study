// const UserAnalyzeRepository = require("../repositories/useranalyzerepository");
const GamesRepository = require("../repositories/games_repository");
const fs = require('fs').promises;
const path = require("path");
const { Games, Reviews, Metascores } = require("../../models");
const { Op } = require("sequelize");

module.exports = class UserAnalyzeService {
    gamesRepository = new GamesRepository();
    // userAnalyzeRepository = new UserAnalyzeRepository();
    bestGameList = async () => {
        try {
            let gameList = new Object();
            const dir = path.join(__dirname, '..', '..', 'logs', '/users/')
            let filelist = await fs.readdir(dir)// 하나의 데이터씩 나누어 출력
            if (filelist.length === 1) {
                return [];
            }
            for (let file of filelist) {
                let list = await fs.readFile(path.join(__dirname, '..', '..', 'logs', '/users/') + file, { encoding: 'utf8' });
                for (let ele of list.split('\n')) {
                    if (ele !== "") {
                        let id_json = JSON.parse(ele)
                        if (id_json['game_appid'] !== undefined) {
                            for (let id of id_json.game_appid) {
                                if (gameList[id.appid] === undefined) {
                                    gameList[id.appid] = 1
                                } else {
                                    gameList[id.appid]++;
                                }
                            }
                        }
                    }
                }
            }
            let counting = new Object();
            let sum = 0;
            for (let i in gameList) {
                if (counting[gameList[i]] === undefined) {
                    counting[gameList[i]] = new Array();
                    counting[gameList[i]].push(i);
                    sum++;
                } else {
                    counting[gameList[i]].push(i);
                    sum++;
                }
            }
            // 몇번 검색했는지 주려면 객체로 올려보내야해서 복잡해진다. 
            // 3개만 추려서 주고싶다.
            // 최상위가 3개 이하면 그 다음걸 주고싶다.
            // 예상해야하는 시나리오
            // 1. 게임의 수가 3개 이하일때 / 게임의 수가 3개 이상일때
            // 2. 가장 많이 검색된 게임이 3개 이하일때 / 3개 이상일때
            // 이렇게 4가지의 경우의 수를 생각해야한다.
            // Object.keys(counting) 키 배열
            let key_arr = Object.keys(counting).reverse()
            let list = [];
            if (sum <= 3) {
                for (let i of key_arr) {
                    counting[i].map(ele => {
                        list.push({ appid: ele });
                    })
                }
                console.log(list)
                const options = {
                    where: {
                        [Op.and]: [
                            { [Op.or]: list },
                            { img_url: { [Op.not]: null } }
                        ]
                    }
                }
                const game_list = await this.gamesRepository.findGames(options);
                return game_list
            } else {
                for (let i of key_arr) {
                    for (let j of counting[i]) {
                        list.push({ appid: j })
                        if (list.length >= 3) {
                            break;
                        }
                    }
                }
                const options = {
                    where: {
                        [Op.and]: [
                            { [Op.or]: list },
                            { img_url: { [Op.not]: null } }
                        ]
                    }
                }
                const game_list = await this.gamesRepository.findGames(options);
                return game_list;
            }
        } catch (error) {
            throw (error)
        }
    }
    userBestGameList = async ({ user_id }) => {
        try {
            let gameList = new Object();
            let list = await fs.readFile(path.join(__dirname, '..', '..', 'logs', '/users/') + user_id + '.log', { encoding: 'utf8' });
            for (let ele of list.split('\n')) {
                if (ele !== "") {
                    let id_json = JSON.parse(ele)
                    if (id_json['game_appid'] !== undefined) {
                        for (let id of id_json.game_appid) {
                            if (gameList[id.appid] === undefined) {
                                gameList[id.appid] = 1
                            } else {
                                gameList[id.appid]++;
                            }
                        }
                    }
                }
            }
            let counting = new Object();
            for (let i in gameList) {
                if (counting[gameList[i]] === undefined) {
                    counting[gameList[i]] = new Array();
                    counting[gameList[i]].push(i);
                } else {
                    counting[gameList[i]].push(i);
                }
            }
            return counting;
        } catch (error) {
            throw (error)
        }
    }
};
