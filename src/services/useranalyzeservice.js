// const UserAnalyzeRepository = require("../repositories/useranalyzerepository");
const GamesRepository = require("../repositories/gamesrepository");
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
            if(filelist.length===1){
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
            for (let i in gameList) {
                if (counting[gameList[i]] === undefined) {
                    counting[gameList[i]] = new Array();
                    counting[gameList[i]].push(i);
                } else {
                    counting[gameList[i]].push(i);
                }
            }
            // 몇번 검색했는지 주려면 객체로 올려보내야해서 복잡해진다. 
            // 3개만 추려서 주고싶다.
            // 최상위가 3개 이하면 그 다음걸 주고싶다.
            let array = []
            for (const i in counting) {
                array.push(i)
            }
            const max = Math.max(...array);
            const keywords_deformed = []
            if (counting[max].length < 3) {
                // 가장 많이 클릭한 숫자의 배열을 찾아 return
                for (const appid of counting[max]) { keywords_deformed.push({ appid }) }
                const options = {
                    where: {
                        [Op.and]: [
                            { [Op.or]: keywords_deformed },
                            // 이미지가 없으면 안뽑아옴
                            { img_url: { [Op.not]: null } }
                        ]
                    }
                }
                const { game_list } = await this.gamesRepository.findGames({ options });
                return game_list
            } else if (counting[max].length > 3) {
                // 만약 최고 검색숫자의 배열이 3개를 안넘으면 두번째것도 표시
                const arr = array.filter(x => {
                    if (x !== (max + "")) return x
                })
                const max_secound = Math.max(...arr);
                const first_second = [...counting[max], ...counting[max_secound]]
                for (const appid of first_second) { keywords_deformed.push({ appid }); }
                const options = {
                    where: {
                        [Op.and]: [
                            { [Op.or]: keywords_deformed },
                            { img_url: { [Op.not]: null } }
                        ]
                    }
                }
                const { game_list } = await this.gamesRepository.findGames({ options });
                return game_list
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
