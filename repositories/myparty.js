const { Parties } = require("../models");
const { Members } = require("../models");

class MyPartyRepository {
  lookupMyParty = async ({ userId }) => {
    try {
      const myParty = await Parties.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Member,
            attributes: ["nickname"],
          },
        ],
      });
      return myParty;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MyPartyRepository;
