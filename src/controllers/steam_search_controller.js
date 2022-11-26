const SteamSearchService = require("../services/steam_search_service");

module.exports = class SteamSearchController {
  steamSearchService = new SteamSearchService();
  steamSearch = async (req, res, next) => {
    try {
      var sum = 0;
      console.time('for');   // 시작
      const id = res.locals.id;

      // post가 좀더 빠름
      const { filterExists, filter, keyword } = req.body;
      const keywords = keyword.split(" ");
      const list = filterExists === 'true'
        ? await this.steamSearchService.steamSearch({ keywords, filter })
        : await this.steamSearchService.steamSearch({ keywords });

      if (id !== undefined) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      console.timeEnd('for');
      res.json({ data: list });
    } catch (error) {
      next(error);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  steamAppidSearch = async (req, res, next) => {
    console.time('for');   // 시작
    try {
      const id = res.locals.id;

      const { keyword } = req.query;
      // keyword is appid
      const list = await this.steamSearchService.steamAppidSearch({ keyword });

      let keywords = { type: 'onething', value: keyword }
      // appid로 검색하는 경우라 키워드를 저장하지 못함.
      if (id !== undefined) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }

      console.timeEnd('for');
      res.json({ data: list });
    } catch (error) {
      next(error);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
};
