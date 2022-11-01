const MyPageService = require("../services/mypage");

class MyPageController {
  constructor() {
    this.myPageService = new MyPageService();
  }

  // 유저 닉네임과 폰 번호 조회
  nicknameAndPhone = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const userInfo = await this.myPageService.nicknameAndPhone({ userId });
      res.status(200).json({ data: userInfo });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  }

  // 유저 닉네임과 폰 번호를 수정
  updateNicknameAndPhone = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { nickname, phone } = req.body;
      await this.myPageService.updateNicknameAndPhone({
        userId,
        nickname,
        phone
      });
      res.status(200).json({ message: "수정이 완료되었습니다." });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  }

  // 유저 회원 탈퇴
  deleteUserAccount = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      await this.myPageService.deleteUserAccount({ userId });
      res.status(200).json({ message: "회원 탈퇴 완료" });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  }



  lookupMyBankAccount = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const myBankAccount = await this.myPageService.lookupMyBankAccount({
        userId,
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


  /** ############# 카드 ############### */
  createCard = async (req, res, next) => {
    try {
      const { bank, card, MMYY, birth, password } = req.body;
      const { userId } = res.locals.user;
      const createCard = await this.myPageService
        .createCard({ bank, card, MMYY, birth, password, userId });
      res.status(201).json({ data: createCard });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + ' : ' + error.message,
      });
    }
  };

  cardList = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const cards = await this.myPageService.cardList({ userId });
      if (cards) {
        cards.sort((a, b) => b.createdAt - a.createdAt);
      }
      return res.status(200).json({ data: cards });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + ' : ' + error.message,
      });
    }
  };

  cardEdit = async (req, res, next) => {
    try {
      const { bank, card, MMYY, birth, password } = req.body;
      const { userId } = res.locals.user;
      const cardEdit = await this.myPageService
        .cardEdit({ bank, card, MMYY, birth, password, userId });
      res.status(200).json({ data: cardEdit });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + ' : ' + error.message,
      });
    }
  };

  cardDelete = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const cardDelete = await this.myPageService.cardDelete({ userId });
      res.status(200).json({ data: cardDelete });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + ' : ' + error.message,
      });
    }
  };

}

module.exports = MyPageController;
