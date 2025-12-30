import redis from '@/lib/redis';
import { NextResponse } from 'next/server';

[cite_start]// [cite: 27-34] Must return 200 and JSON { ok: true }
export async function GET() {
  try {
    await redis.ping(); // Check DB connection
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}