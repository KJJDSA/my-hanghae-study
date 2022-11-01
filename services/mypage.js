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
}

module.exports = MyPageService;
