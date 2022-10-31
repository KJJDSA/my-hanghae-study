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
      if (availbleParty.length > 0) {
        availbleParty.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
        const partyId = availbleParty[0].partyId;
        const numOfMembers = availbleParty[0].numOfMembers + 1;
        await this.matchRepository.updateLeadersParty({
          partyId,
          ID,
          password,
          numOfMembers,
        });
        const updateLeadersParty = await this.matchRepository.findByPartyId({
          partyId,
        });
        const createLeadersMember =
          await this.matchRepository.createLeadersMember({ userId, partyId });
        return updateLeadersParty, createLeadersMember;
      } else {
        const newParty = await this.matchRepository.createLeadersParty({
          ottService,
        });
        const partyId = newParty.partyId;
        const numOfMembers = newParty.numOfMembers + 1;
        await this.matchRepository.updateLeadersParty({
          partyId,
          ID,
          password,
          numOfMembers,
        });
        const updateLeadersParty = await this.matchRepository.findByPartyId({
          partyId,
        });
        const createLeadersMember =
          await this.matchRepository.createLeadersMember({ userId, partyId });
        return { party: updateLeadersParty, member: createLeadersMember };
      }
    } catch (error) {
      throw error;
    }
  };

  matchMember = async ({ userId, ottService }) => {
    try {
      // 3명 이하인 방만 찾아옴
      const availbleParty = await this.matchRepository.findMembersParty({
        ottService,
      });
      // 3명이하인 방이 있을경우
      if (availbleParty) {
        // 3명 이하고 파티장 존재하는 방을 찾아봄
        const hasLeaderParty = await this.matchRepository.findHasLeaderParty({
          ottService,
        });
        // 3명이하 파티장 있는 방이 있을경우
        if (hasLeaderParty) {
          hasLeaderParty.sort((a, b) => {
            return a.createdAt - b.createdAt;
          });
          const partyId = hasLeaderParty[0].partyId;
          const numOfMembers = hasLeaderParty[0].numOfMembers + 1;
          // 해당 파티 레코드의 numOfMembers 를 1늘려줌
          await this.matchRepository.updateMembersParty({
            partyId,
            numOfMembers,
          });
          // Members 테이블에 매칭한 유저 생성함
          await this.matchRepository.createMember({ userId, partyId });
          console.log(
            `파티장 O ${
              numOfMembers - 1
            }명 있는 ${partyId}번 파티에 매칭해주었어요.`
          );
          if (numOfMembers === 4)
            console.log(`${partyId} 번 파티의 매칭이 성공했어요!`);
          return;

          // 파티장 있는 방이 없는 경우
        } else {
          // 파티장 없고 2명 이하인 방만 찾아옴(파티장이 없으니까)
          const noLeaderParty = await this.matchRepository.findNoLeaderParty({
            ottService,
          });
          noLeaderParty.sort((a, b) => {
            return a.createdAt - b.createdAt;
          });
          const partyId = noLeaderParty[0].partyId;
          const numOfMembers = noLeaderParty[0].numOfMembers + 1;
          // 가장 오래된 파티 numOfMembers를 1 늘려줌
          await this.matchRepository.updateMembersParty({
            partyId,
            numOfMembers,
          });
          // Members 테이블에 매칭한 유저 생성함
          await this.matchRepository.createMember({ userId, partyId });
          console.log(
            `파티장 X ${
              numOfMembers - 1
            }명 있는 ${partyId}번 파티에 매칭해주었어요.`
          );
          return;
        }
        // 모든 파티가 꽉 차 있을 경우
      } else {
        // 파티원만 존재하는 파티 생성
        const noLeaderParty = await this.matchRepository.createMembersParty({
          ottService,
        });
        // partyId 구해서 Members 레코드도 생성
        const partyId = noLeaderParty.partyId;
        await this.matchRepository.createMember({ userId, partyId });
        return;
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MatchService;
