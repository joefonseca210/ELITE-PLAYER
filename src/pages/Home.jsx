import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <img src="/assets/elite-logo.jpg" alt="Elite Player" className="hero-logo" />
          <h1 className="hero-title">Elite Player</h1>
          <p className="hero-tagline">Elegant IPTV, playlists, movies, series, and live channels in one place.</p>
          <p className="hero-description">
            Premium IPTV streaming with thousands of live TV channels, movies, and TV shows.
            Experience entertainment like never before with crystal-clear HD and 4K quality.
          </p>
          <div className="hero-actions">
            <Link to="/plans" className="btn btn-primary btn-lg">View Plans</Link>
            <Link to="/setup" className="btn btn-outline btn-lg">Get Started</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose Elite Player?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128250;</div>
            <h3>Live TV</h3>
            <p>Access thousands of live TV channels from around the world, including sports, news, and entertainment.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#127916;</div>
            <h3>Movies & Shows</h3>
            <p>Browse a massive library of on-demand movies and TV series updated daily with the latest releases.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128247;</div>
            <h3>HD & 4K Quality</h3>
            <p>Enjoy crystal-clear streaming in HD and 4K resolution for the best viewing experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128225;</div>
            <h3>Multi-Device</h3>
            <p>Watch on any device — smart TV, phone, tablet, or computer. Your subscription works everywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128203;</div>
            <h3>TV Guide (EPG)</h3>
            <p>Never miss your favorite shows with our built-in Electronic Program Guide showing upcoming schedules.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#9889;</div>
            <h3>Easy Setup</h3>
            <p>Get started in minutes. Just import your M3U playlist URL and start watching instantly.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Streaming?</h2>
        <p>Choose a plan that fits your needs and start watching today.</p>
        <Link to="/plans" className="btn btn-primary btn-lg">Get Started Now</Link>
      </section>
    </div>
  );
}
