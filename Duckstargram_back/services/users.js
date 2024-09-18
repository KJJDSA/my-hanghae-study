const UsersRepository = require('../repositories/users');
const { ValidationError } = require('../exceptions/exception');
const bcrypt = require('bcrypt');

//UserService class를 생성
class Users {
  //UserService class에서 userRepository라는 constructor 생성
  constructor() {
    this.userRepository = new UsersRepository();
  }

  //회원가입
  createUser = async ({ loginId, nickname, hash, confirm, profileImgUrl, intro }) => {
    try {
      //DB에 존재하는 동일 loginid로 User인지 확인
      const isExistUser = await this.userRepository.findUser({ loginId });

      if (isExistUser && isExistUser.loginId === loginId)
        throw { message: ' 동일한 아이디가 존재합니다. ' };

      // //bcrypt를 사용해서 password를 암호화 -> hasedPw
      // const salt = await bcrypt.genSalt(5);
      // const hashedPW = await bcrypt.hash(password, salt);

      const user = await this.userRepository.createUser({
        loginId,
        nickname,
        hash,
        confirm,
        // hashedPW, // hash 된 password 저장
        profileImgUrl,
        intro,
      });
      console.log(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  // 로그인
  userLogin = async ({ loginId, password }) => {
    const existUser = await this.userRepository.userLogin({ loginId });
    const result = await bcrypt.compare(password, existUser.password);
    if (!result || !existUser) {
      return '닉네임 또는 패스워드가 잘못됐습니다.';
    }

    //userLogin에 userID까지 넣어줌 => controller로 가서 userId로 token 생성할 예정
    return {
      loginId: existUser.loginId,
      userId: existUser.userId,
      nickname: existUser.nickname,
      password: existUser.password,
    };
  };
}

module.exports = Users;
