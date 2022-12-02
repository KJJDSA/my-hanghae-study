const SteamSearchService = require("../services/steam_search_service");

module.exports = class SteamSearchController {
  steamSearchService = new SteamSearchService();
  steamSearch = async (req, res, next) => {
    try {
      console.time('for');   // 시작
      const id = res.locals.id;
      const { keyword, slice_start } = req.body;
      let keywords = keyword
      const list = await this.steamSearchService.steamSearch({ keywords, slice_start })


      if (id !== undefined && list.length) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      console.timeEnd('for');
      return res.json({ data: list });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

  steamSearchRender = async (req, res, next) => {
    try {
      console.time('for');   // 시작
      const id = res.locals.id;
      const { keyword, slice_start } = req.body;

      let keywords = keyword
      const list = await this.steamSearchService.steamSearch({ keywords, filter_whether, slice_start })
      if (id !== undefined && list.length) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      console.timeEnd('for');
      res.render("index", { data: list });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  steamAppidSearch = async (req, res, next) => {
    try {
      console.time('for');   // 시작
      const id = res.locals.id;

      // GET과 POST 둘 다 받을 수 있도록 분기 작성
      // 필터 하나 있는거 제하면 다른게없음
      let request;
      if (req.query.appid) request = req.query;
      else request = req.body;
      const { appid, slice_start, filterExists, filter } = request;
      console.log(appid, slice_start, filterExists, filter)

      if (filterExists === undefined) {
        const list = await this.steamSearchService.steamAppidSearch({ appid, slice_start, filterExists });
        res.json({ data: list });
      } else {
        const list = await this.steamSearchService.steamAppidSearch({ appid, slice_start, filter, filterExists });
        res.json({ data: list });
      }

      let keywords = { type: 'onething', value: appid }
      // appid로 검색하는 경우라 키워드를 저장하지 못함.
      if (id !== undefined) {
        await this.steamSearchService.searchLogger({ id, keywords, list: appid });
      }
      console.timeEnd('for'); s
    } catch (error) {
      next(error);
    }
  };

  steamAppidSearchRender = async (req, res, next) => {
    try {
      // console.time('for');   // 시작
      const id = res.locals.id;

      const { appid, name } = req.query;
      console.log(appid,)
      // keyword is appid
      const slice_start = 0
      const list = await this.steamSearchService.steamAppidSearch({ appid, slice_start });

      let keywords = { type: 'onething', value: appid }
      // appid로 검색하는 경우라 키워드를 저장하지 못함.
      if (id !== undefined) {
        await this.steamSearchService.searchLogger({ id, keywords, list: appid });
      }
      // console.timeEnd('for');
      return res.render('search', {
        result: true,
        data: list,
        name,
        appid
      });
    } catch (error) {
      console.log(error)
      res.render('search', {
        result: false,
        data: []
      });
    }
  }
};
