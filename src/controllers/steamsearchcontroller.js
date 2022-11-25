const SteamSearchService = require("../services/steamsearchservice");

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
      //공백이 2개가 연속될경우 테스트
      const keywords = keyword.split(" ");
      //  스페이스가 겹친다면 
      // 삼항 연삼자로 필터시 점차 조건이 늘어날때마다 힘들어질테니 수정
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
      res.status(200).json({ data: list });
    } catch (error) {
      next(error);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
};
