import redis from './redis';
import { nanoid } from 'nanoid';

export async function createPaste(data) {
  const id = nanoid(8);
  const now = Date.now();
  
  const paste = {
    id,
    content: data.content,
    created_at: now,
    // Calculate expiry if ttl is provided (seconds to ms)
    expires_at: data.ttl_seconds ? now + (data.ttl_seconds * 1000) : null,
    max_views: data.max_views || null,
    views: 0
  };

  // Save to Redis
  await redis.set(`paste:${id}`, JSON.stringify(paste));
  
  // Set Redis auto-delete (TTL) as a backup, adding a small buffer (24h)
  if (data.ttl_seconds) {
    await redis.expire(`paste:${id}`, data.ttl_seconds + 86400); 
  }

  return paste;
}

export async function getPaste(id, currentTime) {
  const key = `paste:${id}`;
  const rawData = await redis.get(key);

  if (!rawData) return null;

  const paste = JSON.parse(rawData);

  // 1. Check Time Expiry
  if (paste.expires_at && currentTime > paste.expires_at) {
    return null;
  }

  // 2. Check View Limit
  if (paste.max_views && paste.views >= paste.max_views) {
    return null;
  }

  // 3. Increment View Count
  paste.views += 1;
  
  // Update Redis
  await redis.set(key, JSON.stringify(paste));
  
  // Maintain the TTL on the key if it exists
  if (paste.expires_at) {
    const ttlSeconds = Math.ceil((paste.expires_at - Date.now()) / 1000);
    if (ttlSeconds > 0) {
      await redis.expire(key, ttlSeconds + 86400);
    }
  }

  return paste;
}