const { User } = require('../models');
const{ Op } = require('sequelize');


//UsersRepository 클래스에 user 모델을 생성자로 넣어줌.
class UsersRepository {
    constructor() {
        this.User = User;
    }
    
    //특정 loginId를 가지는 유져가 있는지 확인
    findUser = async ({ loginId }) => {
        const user = await this.User.findOne({
            where: {
                  loginId  //여기 봐주세욥 loginID랑 nickname이랑 둘다 비교할까요?아니면 로그인 아이디만?
            },
        });
        return user;
    };
    
    // createUser라는 async function 생성 .
    createUser = async ({
        loginId,
        nickname,
        password,
        profileImgUrl,
        intro,
    }) => {
        //User constructor에 value를 할당한 후 User에 저장.
        const user = await this.User.create({
            loginId,
            nickname,
            password,
            profileImgUrl,
            intro,
        });
        //User를 반환
        return user;
    };
    
    // 로그인
    userLogin = async ( loginId, password ) => {
        const loginData = await this.User.findOne({ where: { loginId, password } });
        return loginData;
        
    };
}


module.exports = UsersRepository;