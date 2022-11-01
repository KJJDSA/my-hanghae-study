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
}

module.exports = MyPageRepository;
