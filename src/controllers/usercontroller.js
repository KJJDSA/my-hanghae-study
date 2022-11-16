const UserService = require("../services/userservice");

module.exports = class UserController {
  userService = new UserService();
  checkUser = async (req, res) => {
    const { id } = req.body;
    const response = await this.userService.checkUser({ id });
    console.log(response)
    res.json({ 'result': "success", exists: response });
  }

  signUp = async (req, res, next) => {
    const { user_id, password } = req.body;

    const response = await this.userService.createUser({ user_id, password });

    res.json({ 'result': 'success' });
  };

  login = async (req, res, next) => {
    const { user_id, password } = req.body;
    console.log(user_id, password)

    const response = await this.userService.loginUser({ user_id, password });
    // res.cookie("BEAVER", response.token, { maxAge: 180000 });
    res.json({ 'result': 'success', 'token': response.token });
  };
};
