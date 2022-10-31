// 패스포드 모듈 임포트
const passport = require('passport');

// 패스포트-카카오 로그인 로직 라이브러리 임포트
const KakaoStrategy = require('passport-kakao').Strategy;


// 유저 모델 임포트
const { User }  = require('../models');

require('dotenv').config();

// 카카오 로그인 로직 내보내기
module.exports = () => {

    console.log('카카오 로그인 로직');

    // 임포트한 카카오 로그인 로직 사용해 패스포트 미들웨어에 걸어주세요
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_SECRET_KEY,
        callbackURL: '/api/auth/kakao/oauth'
    }, async ( accessToken, refreshToken, profile, done ) => {
        // 카카오에서 찾은 유저 정보 콘솔에 찍기
        console.log( 'kakao profile : ', profile );
        try {
            console.log(`${profile.id} 유저 정보`)

            // 찾은 유저 정보가 이미 db에 존재하는지 찾기
            const isExistUser = await User.findOne({
                where: { kakaoId: profile.id },
            });

            console.log('isExistUser : ', isExistUser);

            // 유저 정보가 이미 존재한다면
            if (isExistUser) {
                // 그냥 로그인
                done(null, isExistUser);

                console.log('유저 정보가 존재해 자동 로그인 되었습니다.');

            } else { // 유저 정보가 존재하지 않는다면

                console.log('유저 정보가 존재하지 않습니다.');

                // 로그인 한 유저 정보 디비에 저장(회원가입)
                const newUser = await User.create({
                    kakaoId: profile.id,
                    email: profile._json && profile._json.kakao_account_email, // 이메일 정보를 카카오에서 받아온다
                    nickname: profile.displayName,                            
                });
                
                console.log('유저 정보 디비에 입력 : ', newUser);

                // 로그인 실행
                done(null, newUser);

                console.log('유저 정보가 입력되어 자동 로그인 되었습니다.');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    ))
}