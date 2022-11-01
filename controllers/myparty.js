const MyPartyService = require('../services/myparty');

class MyPartyController {

    myPartyService = new MyPartyService;

    allPartyInfo = async (req, res) => {

        try {

            const allPartyInfo = await this.myPartyService.sortPartyInfo();
            
            res.status(200).json({ data: allPartyInfo });

        } catch (err) {

            console.log(err);
            
            res.status(err.status || 400);
            
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

            console.log(err);

            res.status(err.status || 400);

        }
    };

}

module.exports = MyPartyController;