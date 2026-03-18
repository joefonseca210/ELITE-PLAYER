import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InstallPrompt from './components/InstallPrompt';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Setup from './pages/Setup';
import Channels from './pages/Channels';
import Player from './pages/Player';
import EPG from './pages/EPG';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <InstallPrompt />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/player" element={<Player />} />
            <Route path="/epg" element={<EPG />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
