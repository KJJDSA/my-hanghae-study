const UserService = require("../services/userservice");

module.exports = class UserController {
  userService = new UserService();
  checkUser = async (req, res) => {
    try {
      
      const { id } = req.body;
      
      const response = await this.userService.checkUser({ id });
      return res.status(response.status).json(response.message);
    } catch (error) {
      next(error)
    }
  }

  signUp = async (req, res, next) => {
    try {
      
      const { user_id, password } = req.body;
      
      const response = await this.userService.createUser({ user_id, password });
      
      res.status(response.status).json({ 'result': 'success' });
    } catch (error) {
      next(error)
    }
  };

  login = async (req, res, next) => {
    try {
      const { user_id, password } = req.body;
      
      const response = await this.userService.loginUser({ user_id, password });
      
      res.status(response.status).json({ 'result': 'success', 'token': response.token });
    } catch (error) {
      next(error)
    }
  };
};
