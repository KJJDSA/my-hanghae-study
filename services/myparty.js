const MyPartyRepository = require('../repositories/myparty');

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

    changeOttInfo = async ( partyId, ottService, ID, password ) => {

        try {

            const changedPartyData = await this.myPartyRepository.updateParty(
                partyId, 
                ottService, 
                ID, 
                password
            );
    
            return changedPartyData;

        } catch (err) {

            console.log(err);

            res.status(err.status || 400);

        }

    }

    getOttInfo = async( partyId ) => {

        try {
            const getOttInfoData = await this.myPartyRepository.findOneParty(partyId);
            return getOttInfoData

        } catch (err) {

        }

    }

}

module.exports = MyPartyService;
