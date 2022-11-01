const MyPartyService = require("../services/myparty");

class MyPartyController {
  constructor() {
    this.myPartyService = new MyPartyService();
  }

  lookupMyParty = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const myParty = await this.myPartyService.lookupMyParty({
        userId,
      });
      console.log(myParty);
      res.status(200).json({ data: myParty });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };

  changePartyInfo = async (req, res) => {
    try {
      const { partyId } = req.params;
      const { ottService, ID, password } = req.body;

      await this.myPartyService.changeOttInfo(
        partyId,
        ottService,
        ID,
        password
      );

      res.status(200).json({ message: "수정이 완료되었습니다." });
    } catch (err) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
}
module.exports = MyPartyController;
