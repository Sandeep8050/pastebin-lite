import { getPaste } from '@/lib/pasteService';
import { getCurrentTime } from '@/lib/utils';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function ViewPaste({ params }) {
  // Await params and headers for Next.js 16
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const headerList = await headers();
  const currentTime = getCurrentTime(headerList);

  const paste = await getPaste(id, currentTime);

  if (!paste) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Minimal Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-bold text-xl tracking-tight text-slate-800 hover:text-indigo-600 transition">
              Pastebin<span className="text-indigo-600">Lite</span>
            </a>
            <div className="h-5 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
              <span>Paste <span className="text-slate-900 font-mono bg-slate-100 px-1.5 py-0.5 rounded ml-1">#{id}</span></span>
            </div>
          </div>
          <a href="/" className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">
            <span>Create New</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </div>
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-semibold text-slate-600">Active</span>
          </div>

          {paste.expires_at && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-xs font-medium text-slate-600">Expires: <span className="text-slate-900">{new Date(paste.expires_at).toLocaleString()}</span></span>
            </div>
          )}

          {paste.max_views && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
              <svg className="w-3.5 h-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <span className="text-xs font-medium text-slate-600">Remaining Views: <span className="text-slate-900 font-bold">{Math.max(0, paste.max_views - paste.views)}</span></span>
            </div>
          )}
        </div>

        {/* Content Editor Window */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-xl overflow-hidden">
          {/* Editor Toolbar */}
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/50"></div>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Read Only</div>
          </div>

          {/* Code Area */}
          <div className="relative group">
            <pre className="p-6 md:p-8 text-sm md:text-base font-mono leading-relaxed text-slate-800 whitespace-pre-wrap bg-white min-h-[400px]">
              {paste.content}
            </pre>
            
            {/* Copy Overlay (Optional flair) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-3 py-1 bg-slate-900/10 backdrop-blur text-xs font-semibold rounded-md text-slate-600">
                Text Content
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-400">
          Generated securely by Pastebin-Lite &bull; {new Date(paste.created_at).getFullYear()}
        </div>

      </main>
    </div>
  );
}