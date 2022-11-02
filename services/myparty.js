const MyPartyRepository = require("../repositories/myparty");
const Sens = require("./sendMessege");

class MyPartyService {
  constructor() {
    this.myPartyRepository = new MyPartyRepository();
    this.sens = new Sens();
  }

  lookupMyParty = async ({ userId }) => {
    try {
      const findMember = await this.myPartyRepository.findMember({ userId });
      // console.log(findMember);
      const lookupMyParty = [];
      for (let i = 0; i < findMember.length; i++) {
        let partyId = findMember[i].partyId;
        // console.log(partyId);
        let myParty = await this.myPartyRepository.lookupMyParty(partyId);
        myParty = {
          ...myParty.dataValues,
          isLeader: findMember[i].isLeader
        }
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


  getOttInfo = async (partyId) => {
    try {
      const getOttInfoData = await this.myPartyRepository.findOneParty(partyId);
      return getOttInfoData;
    } catch (err) {
      throw err
    }
  };

  exitParty = async ({ userId, partyId }) => {
    try {
      const leaderPhone = await this.myPartyRepository.findLeader({ partyId });
      this.sens.send_message(leaderPhone, "누군가 파티를 탈퇴했어요! 보안을 위해 비밀번호를 변경해주세요.")
      await this.myPartyRepository.exitParty({ userId, partyId });
      return result;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = MyPartyService;
