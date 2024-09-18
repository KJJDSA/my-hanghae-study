const { Client } = require('@elastic/elasticsearch')
require("dotenv").config();
const env = process.env;

const client = new Client({
  cloud: {
    id: env.CLOUD_ID
  },
  auth: {
    username: env.USER_NAME,
    password: env.PASSWORD
  }
})


module.exports = client;