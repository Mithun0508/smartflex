import Redis from "ioredis";

let redisClient: Redis | null = null;

if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
}

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  if (!redisClient) return true; // fallback: allow if no Redis

  const now = Math.floor(Date.now() / 1000);
  const windowKey = `${key}:${Math.floor(now / windowSeconds)}`;

  const count = await redisClient.incr(windowKey);
  if (count === 1) {
    await redisClient.expire(windowKey, windowSeconds);
  }
  return count <= limit;
}
