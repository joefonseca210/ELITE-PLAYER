import React, { useState } from 'react';

const plan = {
  id: 'basic',
  name: 'Basic',
  price: '10',
  period: 'month',
  features: [
    '1 Device Connection',
    '3,000+ Live Channels',
    'HD Quality Streams',
    'Standard Support',
    '24/7 Uptime',
  ],
};

export default function Plans() {
  const [selected, setSelected] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="plans-page">
        <div className="success-message">
          <div className="success-icon">&#10003;</div>
          <h2>Subscription Request Received!</h2>
          <p>
            Thank you, <strong>{formData.name}</strong>! Your request for the{' '}
            <strong>{plan.name}</strong> plan (${plan.price}/{plan.period}) has been received.
          </p>
          <p>A confirmation email will be sent to <strong>{formData.email}</strong> with your setup instructions and M3U playlist link.</p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setSelected(false); }}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="plans-page">
        <div className="checkout-card">
          <h2>Subscribe to {plan.name}</h2>
          <p className="checkout-price">
            <span className="price">${plan.price}</span>
            <span className="period">/{plan.period}</span>
          </p>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-full">
              Subscribe Now
            </button>
            <button type="button" className="btn btn-outline btn-full" onClick={() => setSelected(false)}>
              Back
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="plans-page">
      <div className="page-header">
        <h1>Our Plan</h1>
        <p>Get started with Elite Player IPTV streaming</p>
      </div>
      <div className="plans-grid">
        <div className="plan-card">
          <h3 className="plan-name">{plan.name}</h3>
          <div className="plan-price">
            <span className="price">${plan.price}</span>
            <span className="period">/{plan.period}</span>
          </div>
          <ul className="plan-features">
            {plan.features.map((feature, i) => (
              <li key={i}>
                <span className="check">&#10003;</span> {feature}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary btn-full" onClick={() => setSelected(true)}>
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
