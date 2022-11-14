const UserService = require("../services/userservice");

module.exports = class UserController {
  userService = new UserService();
  checkUser = async (req, res) => {
    const { id } = req.params;

    const response = await this.userService.checkUser({ id });
    return res.status(response.status).json(response.message);
  }

  signUp = async (req, res, next) => {
    const { user_id, password } = req.body;

    const response = await this.userService.createUser({ user_id, password });

    res.status(response.status).json(response.message);
  };

  login = async (req, res, next) => {
    const { user_id, password } = req.body;

    const response = await this.userService.loginUser({ user_id, password });
    res.cookie("BEAVER", response.token, { maxAge: 180000 });

    res.status(response.status).json({ message: response.message, token: response.token });
  };
};
