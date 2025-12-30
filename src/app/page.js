'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ content: '', ttl_seconds: '', max_views: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/pastes', {
      method: 'POST',
      body: JSON.stringify({
        content: formData.content,
        ttl_seconds: formData.ttl_seconds ? parseInt(formData.ttl_seconds) : undefined,
        max_views: formData.max_views ? parseInt(formData.max_views) : undefined,
      }),
    });
    const data = await res.json();
    if (res.ok) setResult(data);
  };

  return (
    <main className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-5">Create a Paste</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea 
          placeholder="Paste your content here..." 
          className="border p-3 h-40 rounded"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
        />
        <div className="flex gap-4">
          <input 
            type="number" 
            placeholder="TTL (seconds)" 
            className="border p-2 w-1/2 rounded"
            onChange={(e) => setFormData({...formData, ttl_seconds: e.target.value})}
          />
          <input 
            type="number" 
            placeholder="Max Views" 
            className="border p-2 w-1/2 rounded"
            onChange={(e) => setFormData({...formData, max_views: e.target.value})}
          />
        </div>
        <button className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Create</button>
      </form>
      
      {result && (
        <div className="mt-5 p-4 bg-green-100 rounded text-green-800">
          <p>Success! Your link:</p>
          <a href={result.url} className="underline font-bold">{result.url}</a>
        </div>
      )}
    </main>
  );
}