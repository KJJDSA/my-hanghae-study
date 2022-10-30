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
    } catch (err) {
      throw err;
    }
  };
  updateBankAccount = async ({ userId, bank, account }) => {
    try {
      await this.myPageRepository.updateBankAccount({
        userId,
        bank,
        account,
      });
      const updateBankAccount = await this.myPageRepository.lookupMyBankAccount(
        {
          userId,
        }
      );

      return updateBankAccount;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MyPageService;
