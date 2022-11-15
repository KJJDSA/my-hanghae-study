const SteamSearchService = require("../services/steamsearchservice");
let {search} = require('../middlewares/log/searchlogger');
const fs=require("fs")
const path = require("path");

module.exports = class SteamSearchController {
    steamSearchService = new SteamSearchService();
    steamSearch = async (req, res,next) => {
        try {
            //테스트코드
            const user_id="1";
            // 쿼리스트링으로 받음
            const { keyword } = req.query
            //로깅
            search.info({label:'GET:req /api/search/',message:user_id+"-"+keyword})
            // console.log(keyword)
            const keywords = keyword.split(" ")
            const { game_list } = await this.steamSearchService.steamSearch({ keywords })
            const game_id_list=["1234","5678"];
            if(game_list!==undefined || game_id_list!==undefined){
                //로깅 txt
                const file_path=path.join(__dirname,'..','..','logs','/users/')
                let today=new Date();
                const search_result={
                  date:today.toLocaleString(),
                  gmae_id:game_id_list
                }
                fs.appendFileSync(file_path+user_id+".log", JSON.stringify(search_result)+'\n','utf8')
            }

            return res.status(200).json({
                data: game_list,
                // review_list: result.review_list
            });
        } catch (error) {
            next(error)
            res.status(400).json({ Type: error.name, Message: error.message });
        }

    }
};