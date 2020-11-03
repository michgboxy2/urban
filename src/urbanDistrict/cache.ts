import redis from "redis";

const RedisHost = process.env.RedisHost || "127.0.0.1";
const RedisPort = Number(process.env.RedisPort) || 6379;

export const client = redis.createClient(RedisPort, "0.0.0.0");

client.on("connect", function (error) {
  console.log("redis connected");
});

client.on("error", function (error) {
  console.log(error);
});

client.on("end", function (error) {
  console.log("redis disconnected");
});
