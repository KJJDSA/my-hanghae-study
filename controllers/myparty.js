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

}

module.exports = MyPartyController;