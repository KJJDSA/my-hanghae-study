const { Party } = require("../models");
const { Member } = require("../models");

class MatchRepository {
  findLeadersParty = async ({ ottService }) => {
    try {
      const availbleParty = await Party.findAll({
        where: {
          [Op.and]: [
            { ottService },
            { hasLeader: false },
            { numOfMembers: { [Op.lt]: 4 } },
          ],
        },
      });
      return availbleParty;
    } catch (error) {
      throw error;
    }
  };
  createLeadersParty = async ({ ottService, ID, password }) => {
    try {
      const createdParty = await Party.create({
        ottService,
      });
      return createdParty;
    } catch (error) {
      throw error;
    }
  };
  updateLeadersParty = async ({ ID, password, numOfMembers }) => {
    try {
      const updatedParty = await Party.create({
        ID,
        password,
        hasLeader: true,
        numOfMembers,
      });
      return updatedParty;
    } catch (error) {
      throw error;
    }
  };
  createLeadersMember = async ({ userId, partyId }) => {
    try {
      const createdMember = await Member.create({
        userId,
        partyId,
        isLeader: true,
      });
      return createdMember;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MatchRepository;
