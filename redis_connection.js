const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  rootNodes: [
    {
      host: process.env.redis_endpoint,
    },
  ],
});

// const redisClient = redis.createClient(3000);

redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect();

module.exports = redisClient;
