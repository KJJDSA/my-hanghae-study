const fs=require('fs').promises;
const path = require("path");
const UserAnalyzeService = require("../services/useranalyzeservice");

module.exports = class UserAnalyzeController {
    userAnalyzeService = new UserAnalyzeService();
    bestGame=async(req,res,next)=>{
        try {
            const dir=path.join(__dirname,'..','..','logs','/users/')
            let gameList=new Object();
            let filelist=await fs.readdir(dir)// 하나의 데이터씩 나누어 출력
            for(let file of filelist){
                let list=await fs.readFile(path.join(__dirname,'..','..','logs','/users/')+file,{encoding:'utf8'});
                for(let ele of list.split('\n')){
                    if(ele!==""){
                        let id_json=JSON.parse(ele)
                        for(let id of id_json.game_appid){
                            if(gameList[id.appid]===undefined){
                                gameList[id.appid]=1
                            }else{
                                gameList[id.appid]++;
                            }
                        }
                    }
                }
            }
            return res.status(200).json({gameList})
        } catch (error) {
            console.log(error)
        }
    }
};
