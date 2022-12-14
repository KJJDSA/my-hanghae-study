const SteamSearchService = require("../services/steam_search_service");
const Func = require("../routes/func");
const redisClient = require("../../redis_connection");

module.exports = class SteamSearchController {
  steamSearchService = new SteamSearchService();
  func = new Func();
  steamSearch = async (req, res, next) => {
    try {
      // 시작
      const id = res.locals.id;
      const { keyword, slice_start } = req.body;
      console.time("keyword");
      let keywords = keyword;

      let key = `${keyword}+${slice_start}`;

      // 레디스에 데이터가 있는지 확인
      // let result = await redisClient.hGet("gamename", key);
      // if (result !== null) {
      //   const data = JSON.parse(result);
      //   if (id !== undefined && data.length) {
      //     await this.steamSearchService.searchLogger({ id, keywords, list: data });
      //   }
      //   // console.log("have Data in redis"); 
      //   console.timeEnd("keyword");
      //   return res.json(data);
      // }

      let list = await this.steamSearchService.steamSearch({
        keywords,
        slice_start,
      });

      // 레디스에 저장하기
      await redisClient.hSet("gamename", key, JSON.stringify({ data: list }));

      if (id !== undefined && list.length) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      console.timeEnd("keyword");
      return res.json({ data: list });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  steamSearchRender = async (req, res, next) => {
    try {
      console.time("keyword");
      const id = res.locals.id;
      const { keyword, slice_start } = req.body;
      let keywords = keyword;
      let key = `${keyword}+${slice_start}`;

      const result = await redisClient.hGet("gamename", key);
      if (result !== null) {
        const data = JSON.parse(result);

        if (id !== undefined && data.length) {
          await this.steamSearchService.searchLogger({ id, keywords, list: data });
        }

        // console.log("have Data in redis");
        console.timeEnd("keyword");
        return res.render("index", data);
      }
      let list = await this.steamSearchService.steamSearch({
        keywords,
        // filter_whether,
        slice_start,
      });

      // 레디스에 저장하기
      await redisClient.hSet("gamename", key, JSON.stringify({ data: list }));

      if (id !== undefined && list.length) {
        await this.steamSearchService.searchLogger({ id, keywords, list });
      }
      console.timeEnd("keyword");
      res.render("index", { data: list });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  steamAppidSearch = async (req, res, next) => {
    try {
      console.time("review");
      const id = res.locals.id;

      // GET과 POST 둘 다 받을 수 있도록 분기 작성 <- 별로 좋은방법 아닌듯
      let request;

      if (req.query.appid) request = req.query;
      else request = req.body;

      const { appid, slice_start, filterExists, filter, sort } = request;

      // let key = `${appid}+${slice_start}+${filterExists}+${filter}+${sort}`;
      // console.log(key.split("+"));
      // const result = await redisClient.hGet("appid", key);
      // if (result !== null) { // 캐싱된 데이터 있음
      //   const data = JSON.parse(result);
      //   let keywords = { type: "onething", value: appid };
      //   // appid로 검색하는 경우라 키워드를 저장하지 못함.
      //   if (id !== undefined) {
      //     await this.steamSearchService.searchLogger({
      //       id,
      //       keywords,
      //       list: appid,
      //     });
      //   }
      //   // console.log("have Data in redis");
      //   console.timeEnd("review");
      //   return res.json({ data });
      // }


      // 필터 없는 경우 => 필터를 넣지않는 검색
      if (filterExists !== "true") {
        const { reviews, game_doc } =
          await this.steamSearchService.steamAppidSearch({
            appid,
            slice_start,
            filterExists,
            sort,
          });
        // await redisClient.hSet(
        //   "appid",
        //   key,
        //   JSON.stringify({ game_doc, data: reviews })
        // );

        let keywords = { type: "onething", value: appid };
        // appid로 검색하는 경우라 키워드를 저장하지 못함.
        if (id !== undefined) {
          await this.steamSearchService.searchLogger({
            id,
            keywords,
            list: appid,
          });
        }

        console.timeEnd("review");
        return res.json({ game_doc, data: reviews });

      } else { // 필터 있는 경우
        const { reviews, game_doc } =
          await this.steamSearchService.steamAppidSearch({
            appid,
            slice_start,
            filter,
            filterExists,
            sort,
          });

        // await redisClient.hSet(
        //   "appid",
        //   key,
        //   JSON.stringify({ game_doc, data: reviews })
        // );

        let keywords = { type: "onething", value: appid };
        // appid로 검색하는 경우라 키워드를 저장하지 못함.
        if (id !== undefined) {
          await this.steamSearchService.searchLogger({
            id,
            keywords,
            list: appid,
          });
        }

        console.timeEnd("review");
        return res.json({ game_doc, data: reviews });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  steamAppidSearchRender = async (req, res, next) => {
    try {
      const id = res.locals.id;
      console.time("review");

      const { appid, name } = req.query;
      // keyword is appid
      const slice_start = 0;
      const sort = [{ weighted_vote_score: "desc" }];
      let key = `${appid}+${slice_start}+${undefined}+${undefined}+${sort}`;
      // console.log(key);

      //레디스에 있는지 확인
      const result = await redisClient.hGet("appid", key);
      if (result !== null) {
        const data = JSON.parse(result);
        let keywords = { type: "onething", value: appid };
        // appid로 검색하는 경우라 키워드를 저장하지 못함.
        if (id !== undefined) {
          await this.steamSearchService.searchLogger({
            id,
            keywords,
            list: appid,
          });
        }
        // console.log("have Data in redis");
        console.timeEnd("review");

        return res.render("search", {
          result: true,
          data: data.data,
          game_doc: data.game_doc,
          name,
          func: this.func,
        });
      }

      const { reviews, game_doc } =
        await this.steamSearchService.steamAppidSearch({
          appid,
          slice_start,
          sort,
        });
      let keywords = { type: "onething", value: appid };
      // appid로 검색하는 경우라 키워드를 저장하지 못함.
      if (id !== undefined) {
        await this.steamSearchService.searchLogger({
          id,
          keywords,
          list: appid,
        });
      }

      await redisClient.hSet(
        "appid",
        key,
        JSON.stringify({ game_doc, data: reviews })
      );


      console.timeEnd("review");
      return res.render("search", {
        result: true,
        data: reviews,
        game_doc,
        name,
        func: this.func,
      });
    } catch (error) {
      console.log(error);
      res.render("search", {
        result: false,
        data: [],
      });
    }
  };

  searchAutocomplete = async (req, res) => {
    const { value } = req.body;
    const key = value;
    // const result = await redisClient.hGet("auto-complete", key);
    // if (result !== null) {

    //   // console.log("have Data in redis");
    //   const data = JSON.parse(result);
    //   return res.json(data);
    // }
    const list = await this.steamSearchService.searchAutocomplete({ value });
    await redisClient.hSet("auto-complete", key, JSON.stringify(list));
    res.json(list);
  };
};
