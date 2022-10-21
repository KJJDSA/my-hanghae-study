const UsersRepository = require('../repositories/users.repository');

//UserService class를 생성
class UsersService {
    //UserService class에서 userRepository라는 constructor 생성
    constructor() {
        this.userRepository = new UsersRepository; };
    
    
    createUser = async ({
        loginId,
        nickname,
        password,
        profileImgUrl,
        intro,
    }) => {
        //DB에 존재하는 동일 loginid로 User인지 확인
        const isExistUser = await this.userRepository.findUser({ loginId });
    
        if (isExistUser && isExistUser.loginId === loginId) {
            throw new Error("동일한 ID를 가진 User가 존재합니다.");
        }
        
        const user = await this.userRepository.createUser({
            loginId,
            nickname,
            password,
            profileImgUrl,
            intro,
        });
        
        return user;
    };
    
    // 로그인
    userLogin = async ( loginId, password) => {
        const loginData = await this.userRepository.userLogin( loginId, password );
        
        if (loginData === null) return loginData;
        
        //userLogin에 userID까지 넣어줌 => controller로 가서 userId로 token생성할 예정
        return {
            loginId: loginData.loginId,
            userId: loginData.userId,
            password: loginData.password
        };
    };
    
}

module.exports = UsersService;
