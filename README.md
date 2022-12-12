# Steam For U
- 본 프로젝트는 상업적 목적성을 가지고 가지고 있지 않습니다.
- ReadME 는 매번 업데이트 되며 기술된 정보들은 현 시점을 기준으로 작성한 것입니다.

## 소개
- 스팀 게임리뷰 검색 및 검색결과 기반 게임 추천을 주제로 다루는 Steam For U 입니다. 

## 기능 개요
- 검색: 키워드 검색, 여러 키워드 검색, 필터 적용 검색 
- 추천: 검색 결과를 로그로 수집, 분석하여 관련된 게임 추천 

### 확보한 데이터
- 게임 리스트: 스팀에서 판매하는 15만여개의 게임 리스트
- 게임 리뷰 리스트: 각 appid를 가진 리뷰 리스트 3만여개. 추후 최대 1000만개까지 수집 예정
  - 언어: 한국어, 영어
  
## 기술 스택 
### Frontend: <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
### Framwork: <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
### Database: <img src="https://img.shields.io/badge/AmazonRDS-527FFF?style=for-the-badge&logo=AmazonRDS&logoColor=white"> <img src="https://img.shields.io/badge/Elastic cloud-005571?style=for-the-badge&logo=elasticcloud&logoColor=white">
### Cashing: <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"> <img src="https://img.shields.io/badge/Amazon ElasticCash-232F3E?style=for-the-badge&logo=Amazonaws&logoColor=white">
### Logging: <img src="https://img.shields.io/badge/Logstash-005571?style=for-the-badge&logo=Logstash&logoColor=white"> <img src="https://img.shields.io/badge/Winston-231F20?style=for-the-badge&logo=winston&logoColor=white">
### Publish: <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/AmazonEC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=black">
### Data Collection: <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/Lodash-3492FF?style=for-the-badge&logo=Lodash&logoColor=white">
## Project Setting

###  <img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat-square&logo=.ENV&logoColor=000000"/>
```
MYSQL_USERNAME: mysql 아이디
MYSQL_PASSWORD: mysql 비밀번호
MYSQL_DATABASE: mysql 데이터베이스 이름
MYSQL_HOST: mysql 계정
PORT: 서버 포트
SECRETKEY: jwt 암호키
NODE_ENV: 개발/배포
CLOUD_ID: elastic 클라우드
USER_NAME: elastic 아이디
PASSWORD: elastic 비밀번호
LOG: elastic 인덱스
GAME: elastic 인덱스
USER_INFO: elastic 인덱스
ANALYZE: elastic 인덱스
```
### <img src="https://img.shields.io/badge/Convention-D8352A?style=flat-square&logo=The Conversation&logoColor=000000"/>
- 모델 이름 = 첫 글자 대문자, 무조건 복수형
    - 컬럼명
        - id: 소문*자 붙이기: id, userid, appid, steamid*
        - *steam API 크롤링한 컬럼명은 그대로 사용*
            - review_score, total_positive 등
- 파일 이름 = 소문자 표기, 문자 구분자는 _
- 함수, 메서드명 = 카멜식 작명(앞부분 소문자, _ 없이 대문자로 이어붙이기)
- 클래스 명 = 파스칼식 작명(모든 단어 앞 대문자)
- 변수명 = 스네이크식 작명( 모두 소문자, ‘_’ 사용 )

## ERD
  ![ERD-2week](https://user-images.githubusercontent.com/113815932/202711210-9fe5c64a-2743-4816-a245-766565578b79.png)

