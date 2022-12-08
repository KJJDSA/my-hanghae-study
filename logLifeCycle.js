const client = require("./ELK_connection")



function setTimeoutPromise(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }

const  work= async()=>{
    const date = new Date();
    const year = date.getFullYear(); // 년
    const month = date.getMonth();   // 월
    const day = date.getDate();      // 일
    const today= new Date(year, month, day).toISOString();
    const month_ago= new Date(year, month-1, day).toISOString();
    let logs;
    do {
        logs=await client.search({
            index: "users_logs",
            body: {
                query: {
                    bool: {
                        must_not:[
                            {range:{'@timestamp':{
                                gt:month_ago,
                            }}}
                        ]
                    }
                }
            }
        })
        for(let log of logs.hits.hits){
            await client.delete({
                index: "users_logs",
                id:log._id,
            })
        }
    } while (logs.hits.hits.length!==0);

}
const schedule=async()=>{
    let plan=new Date().toISOString();
    do {
        await setTimeoutPromise(10000);
        const now = new Date();
        let year = now.getFullYear(); // 년
        let month = now.getMonth();   // 월
        let day = now.getDate();      // 일
        let hours = now.getHours(); // 시
        let minutes = now.getMinutes();  // 분
        let seconds = now.getSeconds();  // 초
        let today= new Date(year, month, day,hours,minutes,seconds).toISOString();
        if(today >= plan){
            plan=new Date(year, month, day,hours+1).toISOString();
            console.log(plan)
            await work();
        }
        console.log("now: ",today)
    } while (1);
}
schedule();