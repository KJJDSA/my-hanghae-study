//직사각형 별찍기 https://programmers.co.kr/learn/courses/30/lessons/12969

// 이 문제에는 표준 입력으로 두 개의 정수 a과 b이 주어집니다.
//     별(*) 문자를 이용해 가로의 길이가 a, 세로의 길이가 b인 직사각형 형태를 출력해보세요.
// 제한 조건
//     n과 m은 각각 1000 이하인 자연수입니다.

process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
  const n = data.split(" ");
  const a = Number(n[0]), b = Number(n[1]);

  const star = '*'.repeat(a)
  for (i = 0; i < b; i++) {
    console.log(star);
  }
});

// 어이가 없네 [i] 꼭 쓸 필요 없는거였어? 하하...
