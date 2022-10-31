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
      res.status(200).json({ data: myParty });
    } catch (error) {
      console.log(`${error.name}:${error.message}`);
      res.status(400).json({ Type: error.name, Message: error.message });
    }
  };
}

module.exports = MyPartyController;
