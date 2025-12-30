'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ content: '', ttl_seconds: '', max_views: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: formData.content,
          ttl_seconds: formData.ttl_seconds ? parseInt(formData.ttl_seconds) : undefined,
          max_views: formData.max_views ? parseInt(formData.max_views) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create paste');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Pastebin<span className="text-indigo-600">Lite</span></span>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Secure Text Sharing</div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-semibold text-slate-800">New Paste</h2>
                <p className="text-sm text-slate-500 mt-1">Share text securely with optional expiration.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Content</label>
                  <div className="relative">
                    <textarea 
                      className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl min-h-[300px] font-mono text-sm leading-relaxed text-slate-700 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-y"
                      placeholder="// Paste your code or text here..."
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">Markdown Supported</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      Expiration (TTL)
                      <span className="text-[10px] uppercase font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">Optional</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="Seconds (e.g., 3600)" 
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                        value={formData.ttl_seconds}
                        onChange={(e) => setFormData({...formData, ttl_seconds: e.target.value})}
                      />
                      <span className="absolute right-4 top-3.5 text-xs text-gray-400 font-medium">Sec</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      View Limit
                      <span className="text-[10px] uppercase font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">Optional</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="Max Views (e.g., 5)" 
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                        value={formData.max_views}
                        onChange={(e) => setFormData({...formData, max_views: e.target.value})}
                      />
                      <span className="absolute right-4 top-3.5 text-xs text-gray-400 font-medium">Views</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-300'}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                      </span>
                    ) : 'Create Secure Paste'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar / Results */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Success Card */}
            {result && (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm animate-fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-emerald-900">Paste Created!</h3>
                    <p className="text-sm text-emerald-700 mt-1 mb-3">Your secure link is ready.</p>
                    
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
                      <p className="text-xs font-mono text-slate-600 break-all select-all">{result.url}</p>
                    </div>
                    
                    <a href={result.url} target="_blank" className="mt-4 block w-full py-2.5 bg-emerald-600 text-white text-center rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
                      Visit Paste &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Error Card */}
            {error && (
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100 text-red-700 flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <strong className="block font-semibold">Error</strong>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Why use Pastebin-Lite?
              </h3>
              <ul className="space-y-3">
                {[
                  { title: 'Self-Destructing', desc: 'Set a TTL and your paste vanishes automatically.' },
                  { title: 'View Limits', desc: 'Restrict access to a specific number of opens.' },
                  { title: 'Secure Storage', desc: 'Data is stored in an encrypted Redis cluster.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
                    <span className="text-slate-600">
                      <strong className="text-slate-800">{item.title}:</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}