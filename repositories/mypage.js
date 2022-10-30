const { BankAccount } = require("../models");

class userRepository {
  lookupMyBankAccount = async ({ userId }) => {
    try {
      const myBankAccount = await BankAccount.findByPk({ userId });
      return myBankAccount;
    } catch (error) {
      throw error;
    }
  };
  updateBankAccount = async ({ userId, ottService, ID, password }) => {
    try {
      const updateBankAccount = await BankAccount.update(
        { ottService, ID, password },
        { where: { userId } }
      );

      return updateBankAccount;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userRepository;
