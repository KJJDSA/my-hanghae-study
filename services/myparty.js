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

}

module.exports = MyPartyService;