//정규시크

const nicknameRegex = /^[0-9a-zA-Z]{3,}$/;
const passwordRegex = /^[0-9a-zA-Z`~!@#$%^&*()-_=+]{4,}$/;

test = nicknameRegex.test("dddd")
test2 = passwordRegex.test("####")
// 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
console.log(test, test2)