'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'register'>('search');
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  // Register Form
  const [form, setForm] = useState({
    providerAgentId: '',
    serviceName: '',
    description: '',
    tags: '',
    pricePerRequest: 0,
    endpointUrl: ''
  });

  const search = async () => {
    const res = await fetch(`/api/registry/search?q=${query}`);
    const data = await res.json();
    setResults(data.listings || []);
  };

  const register = async () => {
    await fetch('/api/registry/register', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map(t => t.trim())
      })
    });
    alert('Registered!');
    setForm({ providerAgentId: '', serviceName: '', description: '', tags: '', pricePerRequest: 0, endpointUrl: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Agent Capability Broker
          </h1>
          <p className="text-slate-400 mt-2">Decentralized Service Discovery for AI Agents</p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-2 rounded-full ${activeTab === 'search' ? 'bg-blue-600' : 'bg-slate-800'}`}
          >
            🔍 Find Agents
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-6 py-2 rounded-full ${activeTab === 'register' ? 'bg-cyan-600' : 'bg-slate-800'}`}
          >
            📝 Register Service
          </button>
        </div>

        {activeTab === 'search' ? (
          <div className="space-y-6">
            <div className="flex gap-4">
              <input
                value={query} onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search by capability, description, or tags..."
              />
              <button
                onClick={search}
                className="bg-blue-600 hover:bg-blue-500 px-8 rounded-lg font-bold"
              >
                Search
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((item: any) => (
                <div key={item.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-cyan-400">{item.serviceName}</h3>
                    <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-300">${item.pricePerRequest}/req</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded">#{tag}</span>
                    ))}
                  </div>
                  <div className="bg-black/30 p-2 rounded text-xs font-mono text-slate-500 truncate">
                    {item.endpointUrl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Register New Capability</h2>
            <input
              placeholder="Provider Agent ID" className="w-full bg-slate-950 p-3 rounded border border-slate-800"
              value={form.providerAgentId} onChange={e => setForm({ ...form, providerAgentId: e.target.value })}
            />
            <input
              placeholder="Service Name (e.g., Translation)" className="w-full bg-slate-950 p-3 rounded border border-slate-800"
              value={form.serviceName} onChange={e => setForm({ ...form, serviceName: e.target.value })}
            />
            <textarea
              placeholder="Description" className="w-full bg-slate-950 p-3 rounded border border-slate-800 h-24"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <input
              placeholder="Tags (comma separated)" className="w-full bg-slate-950 p-3 rounded border border-slate-800"
              value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
            />
            <div className="flex gap-4">
              <input
                type="number" placeholder="Price" className="w-1/2 bg-slate-950 p-3 rounded border border-slate-800"
                value={form.pricePerRequest} onChange={e => setForm({ ...form, pricePerRequest: Number(e.target.value) })}
              />
              <input
                placeholder="Endpoint URL" className="w-full bg-slate-950 p-3 rounded border border-slate-800"
                value={form.endpointUrl} onChange={e => setForm({ ...form, endpointUrl: e.target.value })}
              />
            </div>
            <button
              onClick={register}
              className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-bold mt-4"
            >
              Register Capability
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
