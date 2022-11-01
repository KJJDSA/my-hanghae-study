const UserRepository = require('../repositories/user')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserService {
  userRepository = new UserRepository()

  createUser = async ({ nickname, password, phone }) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    password = await bcrypt.hash(password, salt);

    const createUser = await this.userRepository.createUser({ nickname, password, phone })

    return {
      userId: createUser.null,
      nickname: createUser.nickname,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
    }
  }
  findSameNickname = async ({ nickname }) => {
    const findSameNickname = await this.userRepository.findSameNickname({ nickname })
    return findSameNickname
  }

  findUser = async ({ nickname }) => {
    const loginUser = await this.userRepository.findUser({ nickname })
    return loginUser
  }

  loginUser = async ({ nickname, password }) => {
    const loginUser = await this.userRepository.findUser({ nickname })

    if (!loginUser) throw { code: -1 }

    const match = bcrypt.compareSync(password, loginUser.password);

    if (match) {
      const token = jwt.sign({ userId: loginUser.userId }, process.env.SECRET_KEY)
      // console.log(loginUser.userId)
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 600);
      return { token: token, expires: expires, }
    } else {
      throw { code: -1 }
    }
  }
}

module.exports = UserService;