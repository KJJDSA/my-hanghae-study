패키지 깔기
npm init -y
npm install express jsonwebtoken cookie-parser -S
npm i nodemon --save-dev
npm i jsonwebtoken -S
npm i sequelize mysql2 -S
npm i sequelize-cli -D
npx sequelize init

코드복사
뼈대만들기

authMiddleware 등 이름 사알짝 바꾼거 수정해주고 배포해줌
..으로 변경해서 require해야함 모듈폴더 안에 있거든

users, posts, index, comments 있는데 likes도 만들까 그냥 만들자
라우터 다 만듦. 여기서 require 해야 하는건 다 ..으로 해야함

패키지 불러오기 완료들 함

다음 스텝: 일단 몽구스로 된거 다 뜯어고치기
아까 차이점 색칠해놓은거 봤지? 그거 보고 해보자

그 다음엔 터미널로 마이그레이션하고 테이블 만들어보자
아냐 이거먼저 해야됨
npx sequelize model:generate --name User --attributes userId:integer,nickname:string,password:string
npx sequelize model:generate --name Post --attributes postId:integer,userId:integer,nickname:string,title:string,content:string,likes:integer,createAt:date
npx sequelize model:generate --name Comment --attributes postId:integer,commentId:string,userId:integer,nickname:string,content:string,createAt:date
npx sequelize model:generate --name Likes --attributes postId:integer,userId:integer

reference문법 써볼랬는데 너무 어려워서 패스
local 사용해서 일단 하자구....

posts랑 comments 모델 createdAt를 createAt으로 해서 db한번 갈았다.

댓글 content 부분이 post content랑 겹치는데 나중에 활용할 때 문제생길까봐 comment로 바꿈, 한번 더 갈았다.

로그인 할 때 발급하는 토큰이 유효기간이 없었다. 급한대로 1일로 바꿔줬지만 토큰들이 남아있으므로 나중에 리세마라 돌리면 사라질 것이다.

고치고 싶은 문제점들::::

1. 댓글 불러오거나 넣을 때마다 터미널에 뭐라고 뜨는데 이거 고치고 싶다.
   회원가입 할 때:Executing (default): SELECT `userId`, `nickname`, `password`, `createdAt`, `updatedAt` FROM `Users` AS `Users` WHERE (`Users`.`nickname` = 'Developer1');
   Executing (default): INSERT INTO `Users` (`userId`,`nickname`,`password`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?);

댓글 쓸 때 :Executing (default): SELECT `userId`, `nickname`, `password`, `createdAt`, `updatedAt` FROM `Users` AS `Users` WHERE `Users`.`userId` = 1;

댓글 볼 때 Executing (default): SELECT `commentId`, `postId`, `userId`, `nickname`, `comment`, `createdAt`, `updatedAt` FROM `Comments` AS `Comments` WHERE `Comments`.`postId` = '1';

암튼 등등등..
VALUES (DEFAULT,?,?,?,?); 이게 뭔지도 알아내고 싶다.

2. refresh토큰을 사용하지 않아서 탈취시 문제가 된다. refresh토큰 적용하고 싶다.

3. likes 는 숫자로 관리하는게 훨씬 이득인데 이걸 테이블 하나 만들면서까지 관리하는건 아쉽다. 바꿀 수 없을까?
   post에 likes를 내가 좋아요 할 때마다 ++ 혹은 -- 되도록 하면 best.
   하지만 이렇게 하면 내가 이 글에 좋아요 했는지 알릴 길이 없다.
   post 마이그레이션에 iLike 같은거 넣어도, post는 한개기 때문에 누가 좋아요를 누른건지, 내가 좋아요를 누른건지 알 방법이 없다.
   단 지금은 추가될 때마다 ++ , -- 하게 하는건 좋은 것 같다!!

4. 게시글 상세 불러오기와 좋아요한 게시글 보기가 서로 겹친다.
   posts/N , posts/like/like 로 바꾸긴 했지만,

5. likes 좋아요 불러오기 할 때 likes에서 가져오는게 생각보다 많다. 줄일 방법이 없을까?
   ````
   Likes {
    dataValues: { postId: 3 },
    _previousDataValues: { postId: 3 },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
   }```
   이게 다 가져오는 값들이다.
   ````
