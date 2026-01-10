import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

export async function rediscon() {
  if (!process.env.REDIS_URL) {
    console.warn("REDIS_URL not set, skipping Redis");
    return;
  }
  if (!redis.isOpen) {
    await redis.connect();
  }
}

export default redis;

// URL to run redis locally
// REDIS_URL=redis://localhost:6379
