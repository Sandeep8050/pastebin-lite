import { createPaste } from '@/lib/pasteService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    
    const input = {
      content: body.content,
      ttl_seconds: body.ttl_seconds && body.ttl_seconds > 0 ? parseInt(body.ttl_seconds) : null,
      max_views: body.max_views && body.max_views > 0 ? parseInt(body.max_views) : null,
    };

    const paste = await createPaste(input);
    
    const host = request.headers.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    return NextResponse.json({
      id: paste.id,
      url: `${protocol}://${host}/p/${paste.id}`
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}