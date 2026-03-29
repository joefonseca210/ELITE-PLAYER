import React, { useState } from 'react';
import { parseEPG } from '../utils/epgParser';

export default function EPG() {
  const [url, setUrl] = useState('');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  async function handleFetchEPG(e) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url.trim());
      if (!res.ok) throw new Error('Failed to fetch EPG');
      const text = await res.text();
      const parsed = parseEPG(text);
      if (!parsed.length) {
        setError('No program data found. Please check the URL and try again.');
      } else {
        setPrograms(parsed);
      }
    } catch {
      setError('Failed to load EPG data. Please check the URL and try again.');
    }
    setLoading(false);
  }

  const filtered = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.channel.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="epg-page">
      <div className="page-header">
        <h1>TV Guide (EPG)</h1>
        <p>Import your Electronic Program Guide to see what's on</p>
      </div>

      <div className="epg-import-card">
        <form onSubmit={handleFetchEPG} className="epg-form">
          <div className="form-row">
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter XMLTV EPG URL..."
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Loading...' : 'Load Guide'}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>

      {programs.length > 0 && (
        <>
          <div className="search-bar epg-search">
            <input
              type="text"
              placeholder="Search programs or channels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="epg-list">
            {filtered.map((program, i) => (
              <div key={`${program.channel}-${i}`} className="epg-item">
                <div className="epg-time">
                  <span>{program.start}</span>
                  <span className="epg-dash">-</span>
                  <span>{program.stop}</span>
                </div>
                <div className="epg-details">
                  <h4 className="epg-title">{program.title}</h4>
                  <span className="epg-channel">{program.channel}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="no-results">
                <p>No programs match "{search}"</p>
              </div>
            )}
          </div>
        </>
      )}

      {programs.length === 0 && !error && (
        <div className="empty-state">
          <div className="empty-icon">&#128203;</div>
          <h2>No Program Guide Loaded</h2>
          <p>Enter your XMLTV EPG URL above to load the TV schedule.</p>
        </div>
      )}
    </div>
  );
}
