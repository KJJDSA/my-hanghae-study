const UserAnalyzeService = require("../services/useranalyzeservice");

module.exports = class UserAnalyzeController {
    userAnalyzeService = new UserAnalyzeService();
};
