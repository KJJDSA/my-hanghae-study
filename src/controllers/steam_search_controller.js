const SteamSearchService = require("../services/steam_search_service");

module.exports = class SteamSearchController {
  steamSearchService = new SteamSearchService();
  steamSearch = async (req, res, next) => {
    try {
      var sum = 0;
      console.time('for');   // 시작
      //테스트코드
      const id = res.locals.id;
      // console.log(user_id);
      // 쿼리스트링으로 받음

      const { keyword, language, voted_up } = req.query;

      // console.log(keyword)
      const keywords = keyword.split(" ");
      //  스페이스가 겹친다면 
      let filter =
        language && voted_up
          ? { language, voted_up }
          : language
            ? { language }
            : { voted_up };
      const list =
        language || voted_up
          ? await this.steamSearchService.steamSearch({ keywords, filter })
          : await this.steamSearchService.steamSearch({ keywords });
      if (id !== undefined) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      // console.log(list)
      console.timeEnd('for');
      res.json({ data: list });
    } catch (error) {
      next(error);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
};
