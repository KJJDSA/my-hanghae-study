const MatchRepository = require("../repositories/match");

class MatchService {
  constructor() {
    this.matchRepository = new MatchRepository();
  }

  matchLeader = async ({ userId, ottService, ID, password }) => {
    try {
      const availbleParty = await this.matchRepository.findLeadersParty({
        ottService,
      });
      if (availbleParty) {
        availbleParty.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
      } else {
        availbleParty = await this.matchRepository.createLeadersParty({
          ottService,
        });
      }
      const partyId = availbleParty[0].partyId;
      const numOfMembers = availbleParty[0].numOfMembers + 1;
      const updateLeadersParty = await this.matchRepository.updateLeadersParty({
        partyId,
        ID,
        password,
        numOfMembers,
      });
      const createLeadersMember =
        await this.matchRepository.createLeadersMember({ userId, partyId });
      return updateLeadersParty, createLeadersMember;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MatchService;
