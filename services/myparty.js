const MyPartyRepository = require("../repositories/myparty");

class MyPartyService {
  constructor() {
    this.myPartyRepository = new MyPartyRepository();
  }

  lookupMyParty = async ({ userId }) => {
    try {
      const findMember = await this.myPartyRepository.findMember({ userId });
      // console.log(findMember);
      const lookupMyParty = [];
      for (let i = 0; i < findMember.length; i++) {
        let partyId = findMember[i].partyId;
        console.log(partyId);
        const myParty = await this.myPartyRepository.lookupMyParty(partyId);
        lookupMyParty.push(myParty);
      }

      return lookupMyParty;
    } catch (error) {
      throw error;
    }
  };

  changeOttInfo = async ({ userId, partyId, ID, password }) => {
    try {
      const findMember = await this.myPartyRepository.findMemberWithParty({
        userId,
        partyId,
      });

      if (findMember.isLeader == false)
        throw {
          name: "권한",
          message: "아이디 비밀번호 수정은 리더만 가능합니다.",
        };

      const changedPartyData = await this.myPartyRepository.updateParty({
        partyId,
        ID,
        password,
      });

      return changedPartyData;
    } catch (err) {
      throw err;
    }
  };
}

module.exports = MyPartyService;
