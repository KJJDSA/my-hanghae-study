const SteamSearchRepository = require("../repositories/steamsearchrepository");

module.exports = class SteamSearchController {
    steamSearchRepository = new SteamSearchRepository();

    steamSearch = async ({ keyword }) => {
        try {
            const myInfo = await this.steamSearchRepository.steamSearch({ keyword });
            return myInfo;
        } catch (error) {
            throw error;
        }
    }
};
