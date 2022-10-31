const { Party } = require("../models");
const { Member } = require("../models");

class MyPartyRepository {
  lookupMyParty = async ({ userId }) => {
    try {
      const myParty = await Party.findAll({
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
