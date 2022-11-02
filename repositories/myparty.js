const { Parties } = require("../models");
const { Members } = require("../models");

class MyPartyRepository {
  findMember = async ({ userId }) => {
    try {
      const member = await Members.findAll({
        where: { userId },
      });
      return member;
    } catch (error) {
      throw error;
    }
  };

  // 모든 파티 정보를 db에서 조회하는 함수
  lookupMyParty = async (partyId) => {
    try {
      const myParty = await Parties.findByPk(partyId);
      return myParty;
    } catch (error) {
      throw error;
    }
  };

  // 특정 파티의 정보를 조회
  findOneParty = async (partyId) => {
    try {
      const findOnePartyData = await Parties.findByPk(partyId);

      return findOnePartyData;
    } catch (error) {
      console.log(error);

      res.status(err.status || 400);
    }
  };

  // 특정 파티의 정보를 바꿈
  updateParty = async (partyId, ottService, ID, password) => {
    try {
      const updatePartyData = await Parties.update(
        { ottService, ID, password },
        { where: { partyId } }
      );

      return updatePartyData;
    } catch (error) {
      console.log(error);

      res.status(err.status || 400);
    }
  };

  findLeader = async ({ partyId }) => {
    try {
      const leader = await Members.findOne({
        where: {
          [Op.and]: [
            { partyId },
            { isLeader: true }, // 리더 불러!!!!
          ],
        }
      })
      return leader;
    } catch (error) {
      throw error
    }
  }
  exitParty = async ({ userId, partyId }) => {
    await this.Members.destroy({ where: { userId, partyId } })
    await Parties.update(
      { numOfMembers: numOfMembers - 1 },
      { where: { partyId } }
    );
    return;
  }
}

module.exports = MyPartyRepository;
