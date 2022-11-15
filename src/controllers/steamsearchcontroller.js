const SteamSearchService = require("../services/steamsearchservice");

module.exports = class SteamSearchController {
  steamSearchService = new SteamSearchService();
  steamSearch = async (req, res) => {
    try {
      // 쿼리스트링으로 받음
      const { keyword } = req.query;
      // console.log(keyword)
      const keywords = keyword.split(" ");
      const result = await this.steamSearchService.steamSearch({ keywords });
      res.status(200).json({
        game_list_correct: result.game_list_correct,
        review_list: result.review_list,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
};
