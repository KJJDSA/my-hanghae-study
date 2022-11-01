const { Users } = require("../models");
const { BankAccounts } = require("../models");
const { BankCards } = require("../models");

class MyPageRepository {

  // 유저 닉네임과 폰 번호 조회
  nicknameAndPhone = async ({ userId }) => {
    try {
      const myInfo = await Users.findAll({ where: { userId }});
      return myInfo;
    } catch (err) {
      throw error;
    }
    
  }

  // 유저 닉네임과 폰 번호를 수정
  updateNicknameAndPhone = async ({ userId, nickname, phone }) => {
    try {
      const myInfo = await Users.update(
        { nickname, phone },
        { where: { userId } }
      );
      return myInfo;
    } catch (err) {
      throw error;
    }
  }

  // 유저 회원 탈퇴
  deleteUserAccount = async ({ userId }) => {
    try {
      const myInfo = await Users.destroy({ where: {userId} });
      return myInfo;
    } catch (error) {
      throw error;
    }
  }



  lookupMyBankAccount = async ({ userId }) => {
    try {
      const myBankAccount = await BankAccounts.findAll({ where: { userId } });
      return myBankAccount;
    } catch (error) {
      throw error;
    }
  };

  registerBankAccount = async ({ userId, bank, account }) => {
    try {
      const registerBankAccount = await BankAccounts.create({
        bank,
        account,
        userId,
      });

      return registerBankAccount;
    } catch (error) {
      throw error;
    }
  };

  updateBankAccount = async ({ userId, bank, account }) => {
    try {
      const updateBankAccount = await BankAccounts.update(
        { bank, account },
        { where: { userId } }
      );

      return updateBankAccount;
    } catch (error) {
      throw error;
    }
  };

  deleteBankAccount = async ({ userId }) => {
    try {
      const deleteBankAccount = await BankAccounts.destroy({
        where: { userId },
      });

      return deleteBankAccount;
    } catch (error) {
      throw error;
    }
  };

  /** ############################### 카드 #################################### */

  createCard = async ({ bank, card, MMYY, birth, password, userId }) => {
    try {
      let createCard = await BankCards.create({
        bank,
        card,
        MMYY,
        birth,
        password,
        userId,
      });
      return {
        bankcardId: createCard.dataValues.bankcardId,
        userId: createCard.dataValues.userId,
        bank: createCard.dataValues.bank,
        card: createCard.dataValues.card,
      };
    } catch (error) {
      throw error;
    }
  };

  cardList = async ({ userId }) => {
    try {
      const results = await BankCards.findAll({
        where: { userId },
        attributes: {
          exclude: ["birth", "MMYY", "password", "createdAt", "updatedAt"],
        },
      });
      return results;
    } catch (error) {
      throw error;
    }
  };

  cardEdit = async ({
    bank,
    card,
    MMYY,
    birth,
    password,
    userId,
    BankCardId,
  }) => {
    try {
      const updateCount = await BankCards.update(
        { bank, card, MMYY, birth, password, userId },
        {
          where: { BankCardId },
        }
      );
      return updateCount;
    } catch (error) {
      throw error;
    }
  };

  cardIsExist = async ({ BankCardId }) => {
    try {
      const isExist = await BankCards.findByPk(BankCardId);

      return isExist;
    } catch (error) {
      throw error;
    }
  };
  cardDelete = async ({ BankCardId, userId }) => {
    try {
      const deleteCount = await BankCards.destroy({
        where: { BankCardId, userId },
      });

      return deleteCount;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = MyPageRepository;
