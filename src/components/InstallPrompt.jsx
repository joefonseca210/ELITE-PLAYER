import React, { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const installed = () => {
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', installed);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  }

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="install-banner">
      <div className="install-banner-content">
        <span className="install-banner-text">Install Elite Player for the best experience</span>
        <div className="install-banner-actions">
          <button className="btn btn-primary btn-sm" onClick={handleInstall}>
            Install App
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => setDismissed(true)}>
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}
