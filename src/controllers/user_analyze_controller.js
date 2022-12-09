const UserAnalyzeService = require("../services/user_analyze_service");

module.exports = class UserAnalyzeController {
    userAnalyzeService = new UserAnalyzeService();
    bestGame = async (req, res, next) => {
        try {
            const best_list = await this.userAnalyzeService.bestGameList();
            return res.status(200).json({ best_list })
        } catch (error) {
            next(error)
        }
    }

    userLikeGame = async (req, res, next) => {
        try {
            const id = res.locals.id;
            const result = await this.userAnalyzeService.userLikeGame({ user_id: id })
            return res.status(200).json({ result })
        } catch (error) {
            next(error)
        }

    }

    UserBestList = async (req, res, next) => {
        try {
            const id = res.locals.id;
            const game_list = await this.userAnalyzeService.UserBestList({ user_id: id })
            return res.status(200).json({ game_list })
        } catch (error) {
            next(error)
        }
    }

    newGame=async(req,res,next)=>{
        try {
            const new_game=await this.userAnalyzeService.newGame();
            return new_game
        } catch (error) {
            next(error);
        }
    }
};
