import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hls from 'hls.js';

export default function Player() {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('iptv_current_channel');
    if (stored) {
      try {
        setChannel(JSON.parse(stored));
      } catch {
        setChannel(null);
      }
    }
  }, []);

  useEffect(() => {
    if (!channel || !videoRef.current) return;

    const video = videoRef.current;
    const url = channel.url;

    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (url.includes('.m3u8') && Hls.isSupported()) {
      // hls.js — works best on Chrome, Edge, Firefox, and most browsers
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          } else {
            setError('Stream playback error. The channel may be temporarily unavailable.');
          }
        }
      });
    } else if (url.includes('.m3u8') && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback: native HLS support (Safari/iOS)
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
      video.addEventListener('error', () => {
        setError('Stream playback error. The channel may be temporarily unavailable.');
      });
    } else {
      video.src = url;
      video.play().catch(() => {});
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel]);

  if (!channel) {
    return (
      <div className="player-page">
        <div className="empty-state">
          <div className="empty-icon">&#9654;</div>
          <h2>No Channel Selected</h2>
          <p>Browse channels and select one to start watching.</p>
          <button className="btn btn-primary" onClick={() => navigate('/channels')}>
            Browse Channels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-page">
      <div className="player-container">
        <div className="player-header">
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/channels')}>
            &#8592; Back to Channels
          </button>
          <h2 className="player-channel-name">{channel.name}</h2>
        </div>
        <div className="video-wrapper">
          {error && (
            <div className="player-error">
              <p>{error}</p>
              <button className="btn btn-outline btn-sm" onClick={() => { setError(''); setChannel({ ...channel }); }}>
                Retry
              </button>
            </div>
          )}
          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            webkit-playsinline="true"
            className="video-player"
          />
        </div>
      </div>
    </div>
  );
}
