const GamesRepository = require("../repositories/gamesrepository");
const ReviewsRepository = require("../repositories/reviewsrepository");
const { Op } = require("sequelize");
const fs = require("fs")
let { search } = require('../middlewares/log/searchlogger');
const path = require("path");
module.exports = class SteamSearchController {
    gamesRepository = new GamesRepository();
    reviewsRepository = new ReviewsRepository();

    steamSearch = async ({ keywords }) => {
        try {
            // { name: { [Op.like]: "%keyword%" } } 각 키워드를 쿼리 형식으로 만들어주기
            const keywords_deformed = []
            // if (focus === "game") {
            // 검색하는 종류가 게임일경우 Games에서 finder
            for (const keyword of keywords) {
                keywords_deformed.push({ name: { [Op.like]: "%" + keyword + "%" } })
            }

            // }
            // else {
            //     // 검색하는 종류가 리뷰일경우 Reviews에서 finder
            //     for (const keyword of keywords) {
            //         keywords_deformed.push({ review: { [Op.like]: "%" + keyword + "%" } })
            //     }
            //     const game_list = await this.gamesRepository.findReviews({ keywords_deformed });
            //     return game_list

            const { list } = await this.gamesRepository.findGames({ keywords_deformed });
            return { list}

            // 관계형으로 합침

            // 찾아온 게임들의 appid를 추출, 배열화
            // const appids = game_list_correct.map(game => game.appid)
            // // 반복문으로 찾아옴
            // const review_list = [];
            // for (const appid of appids) {
            //     const { result } = await this.reviewsRepository.findReviews({ appid })
            //     review_list.push(result)
            // }
        } catch (error) {
            throw error;
        }
    }

    searchLogger=async({user_id,keywords,list})=>{
        try {
            let key=keywords.join(' ')
            search.info({ label: 'GET:req /api/search/', message: user_id + "-" + key })
            // { name: { [Op.like]: "%keyword%" } } 각 키워드를 쿼리 형식으로 만들어주기
            const keywords_deformed = []
            // if (focus === "game") {
            // 검색하는 종류가 게임일경우 Games에서 finder
            for (const keyword of keywords) {
                keywords_deformed.push({ name: { [Op.like]: "%" + keyword + "%" } })
            }
            const appid_list = await this.gamesRepository.searchGamesId({ keywords_deformed });
            if (list !== undefined || appid_list !== undefined) {
                //로깅 txt
                const file_path = path.join(__dirname, '..', '..', 'logs', '/users/')
                let today = new Date();
                const search_result = {
                    date: today.toLocaleString(),
                    game_appid: appid_list.appid_list
                }
                fs.appendFileSync(file_path + user_id + ".log", JSON.stringify(search_result) + '\n', 'utf8')
            }
            return;
        }catch(error){
            throw error;
        }
    }

};
