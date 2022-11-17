const UserAnalyzeService = require("../services/useranalyzeservice");

module.exports = class UserAnalyzeController {
    userAnalyzeService = new UserAnalyzeService();
    bestGame=async(req,res,next)=>{
        try {
            const best_list=await this.userAnalyzeService.bestGameList();
            return res.status(200).json({best_list})
        } catch (error) {
            next(error)
        }
    }
    userBestGame=async(req,res,next)=>{
        try {
            const {user_id}=req.params;
            const user_best_list=await this.userAnalyzeService.userBestGameList({user_id});
            return res.status(200).json({user_best_list})
        } catch (error) {
            next(error)
        }
    }
};
