import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('iptv_channels');
    if (stored) {
      try {
        setChannels(JSON.parse(stored));
      } catch {
        setChannels([]);
      }
    }
  }, []);

  const filtered = channels.filter((ch) =>
    ch.name.toLowerCase().includes(search.toLowerCase())
  );

  function playChannel(channel) {
    localStorage.setItem('iptv_current_channel', JSON.stringify(channel));
    navigate('/player');
  }

  if (!channels.length) {
    return (
      <div className="channels-page">
        <div className="empty-state">
          <div className="empty-icon">&#128250;</div>
          <h2>No Channels Loaded</h2>
          <p>Import your M3U playlist to browse available channels.</p>
          <button className="btn btn-primary" onClick={() => navigate('/setup')}>
            Import Playlist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="channels-page">
      <div className="page-header">
        <h1>Channels ({channels.length})</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="channels-grid">
        {filtered.map((channel, index) => (
          <div key={`${channel.url}-${index}`} className="channel-card" onClick={() => playChannel(channel)}>
            <div className="channel-icon">&#128250;</div>
            <div className="channel-info">
              <h3 className="channel-name">{channel.name}</h3>
              <span className="channel-status">Live</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="no-results">
            <p>No channels match "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
