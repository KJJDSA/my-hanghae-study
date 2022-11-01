const { Parties } = require("../models");
const { Members } = require("../models");

class MyPartyRepository {
  // 모든 파티 정보를 db에서 조회하는 함수
  lookupMyParty = async ({ userId }) => {
    try {
      const member = await Members.findAll({ userId });
      const { partyId } = { partyId: member[0].partyId };
      const myParty = await Parties.findAll({
        where: { partyId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Members,
            attributes: ["alias"], // Members 테이블에 있는 nickname은 Alias 로 정하게 되었습니다.
          }, //이거 안되서 그냥 넘길게용
        ],
      });
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
    } catch (err) {
      console.log(err);

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
    } catch (err) {
      console.log(err);

      res.status(err.status || 400);
    }
  };
}

module.exports = MyPartyRepository;
