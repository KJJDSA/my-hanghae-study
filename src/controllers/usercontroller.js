const UserService = require("../services/userservice");

module.exports = class UserController {
  userService = new UserService();
  checkUser = async (req, res) => {
    try {

      const { id } = req.body;

      const response = await this.userService.checkUser({ id });
      res.json({ 'result': "success", exists: response });
    } catch (error) {
      next(error)
    }
  }

  signUp = async (req, res, next) => {
    try {

      const { user_id, password } = req.body;

      const response = await this.userService.createUser({ user_id, password });

      res.json({ 'result': 'success' });
    } catch (error) {
      next(error)
    }
  };

  login = async (req, res, next) => {
    try {
      const { user_id, password } = req.body;

      const response = await this.userService.loginUser({ user_id, password });

      res.json({ 'result': response.message, 'token': response.token });
    } catch (error) {
      next(error)
    }
  };
};
