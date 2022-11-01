const MyPartyRepository = require('../repositories/myparty');

class MyPartyService {

    myPartyRepository = new MyPartyRepository();

    sortPartyInfo = async () => {

        try {

            const getPartyData = await this.myPartyRepository.findAllParty();

            // 생성일이 빠른 순으로 정렬
            getPartyData.sort((a,b) => {
                return a.createdAt - b.createdAt;
            });

            return getPartyData;

        } catch (err) {

            console.log(err);
            
            res.status(err.status || 400);
            
        }

    };

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