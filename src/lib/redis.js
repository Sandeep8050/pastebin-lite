import Redis from 'ioredis';

// Ensures we don't create too many connections in development
const globalRedis = global;

if (!globalRedis.redis) {
  globalRedis.redis = new Redis(process.env.REDIS_URL);
}

const redis = globalRedis.redis;
export default redis;