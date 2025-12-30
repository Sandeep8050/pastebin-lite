import { getPaste } from '@/lib/pasteService';
import { getCurrentTime } from '@/lib/utils';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function ViewPaste({ params }) {
  // FIX 1: await params (Required in Next.js 16)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // FIX 2: await headers() (Required in Next.js 16)
  const headerList = await headers();
  const currentTime = getCurrentTime(headerList);

  const paste = await getPaste(id, currentTime);

  if (!paste) {
    notFound();
  }

  return (
    <main className="p-10 max-w-3xl mx-auto font-mono">
      <div className="bg-gray-100 p-6 rounded shadow overflow-auto whitespace-pre-wrap">
        {paste.content}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Paste ID: {id}
      </div>
    </main>
  );
}