// const UserAnalyzeRepository = require("../repositories/useranalyzerepository");
const fs=require('fs').promises;
const path = require("path");

module.exports = class UserAnalyzeService {
    // userAnalyzeRepository = new UserAnalyzeRepository();
    bestGameList=async()=>{
        let gameList=new Object();
        const dir=path.join(__dirname,'..','..','logs','/users/')
        let filelist=await fs.readdir(dir)// 하나의 데이터씩 나누어 출력
        for(let file of filelist){
            let list=await fs.readFile(path.join(__dirname,'..','..','logs','/users/')+file,{encoding:'utf8'});
            for(let ele of list.split('\n')){
                if(ele!==""){
                    let id_json=JSON.parse(ele)
                    if(id_json['game_appid']!==undefined){
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
        }
        let counting=new Object();
        for(let i in gameList){
            if(counting[gameList[i]]===undefined){
                counting[gameList[i]]=new Array();
                counting[gameList[i]].push(i);
            }else{
                counting[gameList[i]].push(i);
            }
        }
        return counting;
    }
    userBestGameList=async({user_id})=>{
        let gameList=new Object();
        let list=await fs.readFile(path.join(__dirname,'..','..','logs','/users/')+user_id+'.log',{encoding:'utf8'});
        for(let ele of list.split('\n')){
            if(ele!==""){
                let id_json=JSON.parse(ele)
                if(id_json['game_appid']!==undefined){
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
        let counting=new Object();
        for(let i in gameList){
            if(counting[gameList[i]]===undefined){
                counting[gameList[i]]=new Array();
                counting[gameList[i]].push(i);
            }else{
                counting[gameList[i]].push(i);
            }
        }
        return counting;
    }
};
