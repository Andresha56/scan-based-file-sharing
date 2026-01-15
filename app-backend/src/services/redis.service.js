const Redis = require("ioredis");

module.exports = redisClient = new Redis({
  port: 6379,
  host: "127.0.0.1",
});

// The connection is automatically established upon creating a new instance
redisClient.on("connect", () => {
  console.log("ioredis connected!");
});
redisClient.on("error", (err) => console.error("Redis error:", err));
