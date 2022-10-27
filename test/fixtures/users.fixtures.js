/** userRepositoryFixtures **/

exports.createUserInsert = {
  loginId: "sparta",
  nickname: "sparta",
  password: "1234",
  confirm: "1234",
  profileImgUrl: undefined,
  intro: undefined,
}

exports.createUserResult = {
  dataValues: {
    "profileImgUrl": "public/images/defaultProfile/default_img.jpeg",
    "userId": 1,
    "loginId": "sparta",
    "nickname": "sparta",
    "password": "1234",
    "updatedAt": "2022-10-26T16:09:18.909Z",
    "createdAt": "2022-10-26T16:09:18.909Z"
  }
}