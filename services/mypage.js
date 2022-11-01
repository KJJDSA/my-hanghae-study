const MyPageRepository = require("../repositories/mypage");

class MyPageService {
  constructor() {
    this.myPageRepository = new MyPageRepository();
  }

  lookupMyBankAccount = async ({ userId }) => {
    try {
      const myBankAccount = await this.myPageRepository.lookupMyBankAccount({
        userId,
      });
      return myBankAccount;
    } catch (error) {
      throw error;
    }
  };

  registerBankAccount = async ({ userId, bank, account }) => {
    try {
      await this.myPageRepository.registerBankAccount({
        userId,
        bank,
        account,
      });
      const registerBankAccount =
        await this.myPageRepository.lookupMyBankAccount({
          userId,
        });

      return registerBankAccount;
    } catch (error) {
      throw error;
    }
  };

  updateBankAccount = async ({ userId, bank, account }) => {
    try {
      await this.myPageRepository.updateBankAccount({
        userId,
        bank,
        account,
      });
      const myBankAccount = await this.myPageRepository.lookupMyBankAccount({
        userId,
      });

      return myBankAccount;
    } catch (error) {
      throw error;
    }
  };

  deleteBankAccount = async ({ userId }) => {
    try {
      await this.myPageRepository.deleteBankAccount({
        userId,
      });

      const myBankAccount = await this.myPageRepository.lookupMyBankAccount({
        userId,
      });

      return myBankAccount;
    } catch (error) {
      throw error;
    }
  };


  /** ########################## 카드 ########################### */

  createCard = async ({ bank, card, MMYY, birth, password, userId }) => {
    try {
      const createCard = await this.myPageRepository
        .createCard({ bank, card, MMYY, birth, password, userId });
      return createCard;
    } catch (error) {
      throw error;
    }
  };

  cardList = async ({ userId }) => {
    try {
      const cards = await this.myPageRepository.cardList({ userId });
      if (cards.length === 0) {
        return null;
      }
      return cards;
    } catch (error) {
      throw error;
    }
  };

  cardEdit = async ({ bank, card, MMYY, birth, password, userId, BankCardId }) => {
    try {
      const isExist = await this.myPageRepository.cardIsExist({ BankCardId });
      if (!isExist) {
        throw { name: "cardedit-S", message: "카드가 존재하지 않습니다." };
      }
      const cardedit = await this.myPageRepository
        .cardEdit({ bank, card, MMYY, birth, password, userId, BankCardId });

      if (cardedit < 1) throw { name: "cardEdit-S", message: "수정 실패" };
      return "수정 성공";
    } catch (error) {
      throw error;
    }
  };

  cardDelete = async ({ BankCardId, userId }) => {
    try {
      const isExist = await this.myPageRepository.cardIsExist({ BankCardId });
      if (!isExist) {
        throw { name: "carddelete-S", message: "카드가 존재하지 않습니다." };
      }

      const carddelete = await this.myPageRepository.cardDelete({ BankCardId, userId });
      if (carddelete < 1) throw { name: "carddelete-S", message: "삭제할 수 없습니다." };
      return "삭제 성공";
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MyPageService;
