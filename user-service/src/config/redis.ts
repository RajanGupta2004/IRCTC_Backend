import Redis from "ioredis";

class RedisClient {
  private static instance: Redis;

  private constructor() {}

  static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      });

      RedisClient.instance.on("connect", () => {
        console.log("✅ Redis Connected");
      });

      RedisClient.instance.on("error", (error) => {
        console.log("❌ Redis Error:", error);
      });
    }

    return RedisClient.instance;
  }
}

export default RedisClient;
