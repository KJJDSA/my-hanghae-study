const MyPartyRepository = require("../repositories/myparty");

class MyPartyService {
  constructor() {
    this.myPartyRepository = new MyPartyRepository();
  }

  lookupMyParty = async ({ userId }) => {
    try {
      const myParty = await this.myPartyRepository.lookupMyParty({
        userId,
      });
      return myParty;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MyPartyService;
