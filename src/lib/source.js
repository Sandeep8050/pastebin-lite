import Redis from 'ioredis';

// Singleton pattern to prevent multiple connections in serverless
const globalRedis = global;

if (!globalRedis.redis) {
  globalRedis.redis = new Redis(process.env.REDIS_URL);
}

const redis = globalRedis.redis;
export default redis;