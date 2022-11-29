const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path=require('path');
 
const { combine, timestamp, label, printf } = winston.format;
 

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const log_dir = `${process.cwd()}/logs`;
 
//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
   return `${timestamp} [${label}] [${level}] ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const search_result = winston.createLogger({
   //* 로그 출력 형식 정의
   format: combine(
     winston.format.json(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat, // log 출력 포맷
      //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
   ),
   //* 실제 로그를 어떻게 기록을 한 것인가 정의
   transports: [
      //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
      new winstonDaily({
         level: 'info', // info 레벨에선
         datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
         dirname: log_dir+'/users', // 파일 경로
         filename: `%DATE%.log`, // 파일 이름
         maxFiles: 30, // 최근 30일치 로그 파일을 남김
         zippedArchive: true,
      })
   ]
});


//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
if (process.env.NODE_ENV !== 'production') {
    search_result.add(
      new winston.transports.Console({
         format: winston.format.combine(
            winston.format.colorize(), // 색깔 넣어서 출력
            winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
         ),
      }),
   );
}
 
module.exports ={
    search_result
}