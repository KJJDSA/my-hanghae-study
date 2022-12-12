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
- +메타스코어 점수 리스트: 리뷰하는 게임이 메타스코어 점수가 존재한다면 끌어오기 위해 수집.  

### 구현된 기능 
로그인, 회원가입: 유저별 게임추천 기능 제작을 위해 기획

검색 기능 
  - 필터검색 기능: 언어, 추천여부
  - 틀리지 않다는 전제 하에 키워드 검색 가능 
    - 키워드가 부족하거나 중간에 빼먹더라도 검색 가능
  - 검색 순서: 
    - 게임 리스트 테이블에서 게임 검색 
    - 관계형 데이터베이스 사용, appid를 외래키로 리뷰 리스트 및 메타스코어 JOIN

로그 수집 및 추천 기능
  - 유저 검색결과 수집
  - 검색결과 분석, 가장 많은 검색결과를 가진 appid 리스트를 뽑아 3개 랜덤으로 출력

프론트엔드 뼈대
  - ajax, ejs를 활용, 한 페이지 내에서 추천과 검색 모두 이용 가능하도록 설계
  - 새로고침시 추천배너가 새로 로딩되며, 검색결과를 append할 때면 아래로 밀려나 사라진것처럼 연출
  - 가능한 가지고 있는 모든 field를 넣어보려 했으나 공간상, 또 유저사용경험상의 이유로 데이터의 80%만 출력중

### 구현되지 않은 기능

1. Elastic Search: 현재 데이터를 RDS에 저장, 사용중이나 추후 ES로 데이터 마이그레이션 예정
2. 로드밸런서: 데이터 수집 - 완료 후 대량 요청건에 관한 솔루션 또한 추구할 예정
3. 자동완성
4. 유저별 게임추천 기능

## ERD
  ![ERD-2week](https://user-images.githubusercontent.com/113815932/202711210-9fe5c64a-2743-4816-a245-766565578b79.png)

## 기술 스택 

### 프론트 <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

### 프레임워크 <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

### DB <img src="https://img.shields.io/badge/AmazonRDS-527FFF?style=for-the-badge&logo=AmazonRDS&logoColor=white"> <img src="https://img.shields.io/badge/elasticcloud-005571?style=for-the-badge&logo=elasticcloud&logoColor=white">

### 캐싱 <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">

### 배포 <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/AmazonEC2-232F3E?style=for-the-badge&logo=AmazonEC2&logoColor=white">

### 데이터 수집 <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/Lodash-3492FF?style=for-the-badge&logo=Lodash&logoColor=white">

