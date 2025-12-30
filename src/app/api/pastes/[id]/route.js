import { getPaste } from '@/lib/pasteService';
import { getCurrentTime } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  // FIX: await params here too
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Note: request.headers is still synchronous in API routes, so this line is fine:
  const currentTime = getCurrentTime(request.headers);

  const paste = await getPaste(id, currentTime);

  if (!paste) {
    return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
  }

  return NextResponse.json({
    content: paste.content,
    remaining_views: paste.max_views ? Math.max(0, paste.max_views - paste.views) : null,
    expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null
  });
}