const SteamSearchRepository = require("../repositories/steamsearchrepository");

module.exports = class SteamSearchController {
    steamSearchRepository = new SteamSearchRepository();
};
