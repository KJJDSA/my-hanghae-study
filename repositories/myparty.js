const { Parties } = require('../models');


class MyPartyRepository {

    // 모든 파티원 정보를 db에서 조회하는 함수
    findAllParty = async () => {

        try {

            const allPartysData = await Parties.findAll();

            return allPartysData;

        } catch (err) {

            console.log(err);

            res.status(err.status || 400);

        }

    }

}

module.exports = MyPartyRepository;