const MatchService = require("../services/match");

class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  matchLeader = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { ottService, ID, password } = req.body;
      const matchLeader = await this.matchService.matchLeader({
        userId,
        ottService,
        ID,
        password,
      });
      res.status(200).json({ data: matchLeader });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
}

module.exports = MatchController;
