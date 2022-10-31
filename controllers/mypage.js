const MyPageService = require("../services/mypage");
const { User } = require("../models")

class MyPageController {
  constructor() {
    this.myPageService = new MyPageService();
  }

  lookupMyBankAccount = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const myBankAccount = await this.myPageService.lookupMyBankAccount({
        userId
      });
      res.status(200).json({ data: myBankAccount });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  registerBankAccount = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { bank, account } = req.body;
      const myBankAccount = await this.myPageService.registerBankAccount({
        userId,
        bank,
        account,
      });
      res.status(200).json({ data: myBankAccount });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  updateBankAccount = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { bank, account } = req.body;
      const myBankAccount = await this.myPageService.updateBankAccount({
        userId,
        bank,
        account,
      });
      res.status(200).json({ data: myBankAccount });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  deleteBankAccount = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      await this.myPageService.deleteBankAccount({
        userId,
      });
      res.status(200).json({ message: "삭제가 완료되었습니다." });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
}

module.exports = MyPageController;
