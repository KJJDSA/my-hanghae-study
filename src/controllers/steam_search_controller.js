const SteamSearchService = require("../services/steam_search_service");

module.exports = class SteamSearchController {
  steamSearchService = new SteamSearchService();
  steamSearch = async (req, res, next) => {
    try {
      console.time('for');   // 시작
      const id = res.locals.id;
      // post가 좀더 빠름
      const { filterExists, filter, keyword, slice_start } = req.body;
      let keywords = keyword
      // 풀텍스트 쿼리에 + - "" * < > ( ) 등이 검색어로 있으면 오류를 일으킴
      if (keywords.includes('(' || ')')) keywords = keywords.replace('(', '').replace(')', '')
      const list = filterExists === 'true'
        ? await this.steamSearchService.steamSearch({ keywords, filter, slice_start })
        : await this.steamSearchService.steamSearch({ keywords, slice_start });

      if (id !== undefined && list.length) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      console.timeEnd('for');
      res.json({ data: list });
    } catch (error) {
      console.log(error)
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
