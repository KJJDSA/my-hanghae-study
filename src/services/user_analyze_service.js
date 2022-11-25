// const UserAnalyzeRepository = require("../repositories/useranalyzerepository");
const GamesRepository = require("../repositories/games_repository");
const UserRepository = require("../repositories/user_repository");
const fs = require('fs').promises;
const path = require("path");
const { Games, Reviews, Metascores } = require("../../models");
const { Op, col } = require("sequelize");
// 임시 코드 repository 
class UserLikeGameRepository{
    createGame=async({user_id, appid})=>{
    }
};
class UserAnalyzeRepository{
    constructor(){
        this.userid;
        this.allvector;
        this.unitvector;
    }
    findOneUserVector=async({user_id})=>{
    }
    UserSetGameRank=async({user_id})=>{
    }
    createUserVector=async({user_id,vector})=>{
    }
    uploadVector=async({user_id,vector})=>{
    }
}

class VectorSimilarity{
    cosinSimilarity=async(unit_vec1,unit_vec2)=>{
        let cosin=0;
        for(let i in unit_vec1){
            if(unit_vec2[i]!==undefined){
                cosin+=unit_vec1[i]*unit_vec2[i];
            }
        }
        return cosin;
    }
}

module.exports = class UserAnalyzeService {
    gamesRepository = new GamesRepository();
    userRepository = new UserRepository();
    userAnalyzeRepository = new UserAnalyzeRepository();
    userLikeGameRepository = new UserLikeGameRepository();
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
            let sum=0;
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
            let key_arr=Object.keys(counting).reverse()
            let list=[];
            if(sum<=3){
                for(let i of key_arr){
                    counting[i].map(ele=>{
                        list.push({appid:ele});
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
                const { game_list } = await this.gamesRepository.findGames({ options });
                return game_list
            }else{
                for(let i of key_arr){
                    for(let j of counting[i]){
                        list.push({appid:j})
                        if(list.length>=3){
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
                const { game_list } = await this.gamesRepository.findGames({ options });
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
    //선호하는 유저 저장
    userLikeGame=async({user_id, appid})=>{
        try {
            //해당 appid으로 게임데이터를 가지고오고 게임데이터에서 카테고리 추출
            const option={
                where: {
                    appid
                }
            }
            const game_info=await this.gamesRepository.findGames({option});
            const game_vector=new Object();

            // category : 게임의 카테고리가 쌓여있는 [{id:,description:},{..},...]형태의 배열
            game_info.category.map(ele=>{
                //game_vector 등록 되어 있지 않으면 1로 초기화아니면 +1
                if(game_vector[ele.id]===null||game_vector[ele.id]===undefined){
                    game_vector[ele.id]=1;
                }else{
                    game_vector[ele.id]++;
                }
            })
            // game_vector : 선호하는 게임의 카테고리 벡터

            //userAnalyze : 유저가 가지고 있는 합벡터, 단위 벡터
            //해당 유저의 vector를 가지고온다.
            let user_info=await this.userAnalyzeRepository.findOneUserVector({user_id});
            let user_vector={};
            //벡터가 없을경우 빈 객체로 준다.
            if(user_info!==undefined){
                user_vector=user_info.allvector;
            }

            //유저의 벡터와 게임의 벡터를 더한다.
            // 해당 유저에게 벡터가 없을경우 등록
            let sum_pow_vector_value=0;
            for(let cate in game_vector ){
                if(user_vector[cate]===null||user_vector[cate]===undefined){
                    user_vector[cate]=game_vector[cate]
                }else{
                    user_vector[cate]+=game_vector[cate]
                }
                sum_pow_vector_value+=Math.pow(user_info[cate],2);
            }
            
            //단위 벡터로 만들어
            let new_unit_vector={};
            for(let ele in user_vector){
                new_unit_vector[ele]=user_vector[ele]/Math.sqrt(sum_pow_vector_value);
            }

            //새롭게 만들어진 정보를 업데이트
            let update_unit_vector=await this.userAnalyzeRepository.uploadVector({userid:user_id,unitvector:new_unit_vector,allvector:user_vector})


            const success=await this.userLikeGameRepository.createGame({user_id, appid});
            return success===1 ? {status:200,message:"success"} : {status:400,message:"faild"}
        } catch (error) {
            throw(error)
        }
    }

    newUserBestList=async({user_id})=>{
        try {
            let mine_vector=await this.userAnalyzeRepository.findOneUser({user_id});
            option={
                where: {
                    [Op.and]: [
                        { userid: { [Op.ne]: user_id} }
                    ]
                }
            }
            //자신을 뺀 유저 리스트
            let target_list=await this.userAnalyzeRepository.findAllUser({option})
            //각 유저의 벡터 정보를 받아온다.

            const vectorSimilarity=new VectorSimilarity();
            let cosin_similarity=[];
            let like_games={};
            for(let i in target_list){
                //코사인 유사도 계산
                let cosin=vectorSimilarity.cosinSimilarity(mine_vector.unitvector,target_list[i].unitvector);
                
                if(cosin>=0.8){
                    cosin=Math.round(i.cosin*100)/100;
                    cosin_similarity.push({
                        userid:target_list[i].userid,
                        cosin
                    })
                    let like_game=await this.userLikeGameRepository.findOneUser({userid:target_list[i].userid,});
                    for(let i of like_game){
                        if(like_games[i.appid]===undefined|| like_games[i.appid]===null){
                            like_games[i.appid]=cosin;
                        }else{
                            like_games[i.appid]+=cosin;
                        }
                    }
                }else{
                    continue;
                }
            }
        
            return like_games;
        } catch (error) {
            
        }
    }
};
