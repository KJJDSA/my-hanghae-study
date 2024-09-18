

class Func {
  findGenresOrCategories = (element) => {
    let arr = [];
    for (let i = 0; i < element.length; i++) {
      arr.push(element[i].description)
    }
    return arr.join(", ")
  };


  findPlatform = (platforms) => {
    let arr = [];
    for (const platform in platforms) {
      const check = platforms[platform] ? platform : ""
      arr.push(check)
    }
    return arr.join(" ")
  }

  timestampToDate = (timestamp) => {
    let date = new Date(timestamp * 1000)
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분
    let YMD = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`

    if (time < 60) {
      return parseInt(time) + "분 전"
      //parseInt는 파라미터 안을 정수로 바꿔주는 파이썬 함수같은 거구나.
    }
    time = time / 60  // 시간
    if (time < 24) {
      return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
      return parseInt(time) + "일 전"
    }
    time = time / 7
    if (time < 30) {
      return parseInt(time) + "주 전"
    }
    time = time / 30
    if (time < 12) {
      return parseInt(time) + "개월 전"
    }
    return YMD
  }
}

module.exports = Func