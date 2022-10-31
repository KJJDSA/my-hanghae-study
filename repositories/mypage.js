const { BankAccounts } = require("../models");

class MyPageRepository {
  lookupMyBankAccount = async ({ userId }) => {
    try {
      const myBankAccount = await BankAccounts.findAll({ where: { userId } });
      return myBankAccount;
    } catch (error) {
      throw error;
    }
  };
  updateBankAccount = async ({ userId, ottService, ID, password }) => {
    try {
      const updateBankAccount = await BankAccounts.update(
        { ottService, ID, password },
        { where: { userId } }
      );

      return updateBankAccount;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MyPageRepository;
