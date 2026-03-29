import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseM3U } from '../utils/m3uParser';

export default function Setup() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleImport(e) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url.trim());
      if (!res.ok) throw new Error('Failed to fetch playlist');
      const text = await res.text();
      const channels = parseM3U(text);
      if (!channels.length) {
        setError('No channels found in playlist. Please check the URL and try again.');
        setLoading(false);
        return;
      }
      localStorage.setItem('iptv_channels', JSON.stringify(channels));
      navigate('/channels');
    } catch (err) {
      setError('Failed to load playlist. Please check the URL and try again.');
    }
    setLoading(false);
  }

  return (
    <div className="setup-page">
      <div className="setup-card">
        <img src="/assets/elite-logo.jpg" alt="Elite Player" className="setup-logo" />
        <h1>Set Up Your IPTV Service</h1>
        <p className="setup-description">
          Enter your M3U playlist URL below to import your channels. You'll receive this URL
          in your subscription confirmation email.
        </p>
        <form onSubmit={handleImport} className="setup-form">
          <div className="form-group">
            <label htmlFor="playlist-url">M3U Playlist URL</label>
            <input
              id="playlist-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/playlist.m3u"
              disabled={loading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
            {loading ? 'Importing...' : 'Import Playlist'}
          </button>
        </form>
        <div className="setup-help">
          <h3>How to get your playlist URL:</h3>
          <ol>
            <li>Choose a <a href="/plans">subscription plan</a></li>
            <li>Complete the signup process</li>
            <li>Check your email for your M3U playlist link</li>
            <li>Paste the link above and click Import</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
