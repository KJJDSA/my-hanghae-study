const { Client } = require("elasticsearch");
const env = process.env;

const client = new Client({
  cloud: {
    id: env.CLOUD_ID,
  },
  auth: {
    username: env.USER_NAME,
    password: env.PASSWORD,
  },
});

client.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    if (error) {
      console.log("Elasticsearch Database is down...");
    } else {
      console.log("All is well");
    }
  }
);

module.exports = client;
