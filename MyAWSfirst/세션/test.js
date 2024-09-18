const date = [
  {
    "postId": "633ae2fa708d74b945a728af",
    "user": "Developer3",
    "title": "디벨로퍼3",
    "cratedAt": "2022-10-03T13:26:18.845Z"
  },
  {
    "postId": "633bb3e6abb7fb3bb06973a3",
    "user": "김감자",
    "title": "감자입니다4",
    "cratedAt": "2022-10-04T04:17:42.239Z"
  },
  {
    "postId": "633bb3f3abb7fb3bb06973a5",
    "user": "김갑순",
    "title": "갑순입니다4",
    "cratedAt": "2022-10-04T04:17:55.965Z"
  }
]

const orderedDate = date.sort((a, b) => a["createdAt"] - b["createdAt"])

console.log(orderedDate)