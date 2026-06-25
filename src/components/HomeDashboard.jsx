import { useState } from 'react'
import { Car, Clock, Star, ArrowRight, Zap, DollarSign, Shield } from 'lucide-react'

const QUICK_DESTINATIONS = [
  { label: 'Home',        sub: '14 Moshoeshoe Rd', icon: '🏠' },
  { label: 'Work',        sub: 'CBD, Maseru',       icon: '🏢' },
  { label: 'Lesotho Sun', sub: 'Hilton Hotel',      icon: '🏨' },
]

const RECENT_RIDES = [
  { to: 'Maseru Mall',    price: 45, date: 'Today, 09:14',     rating: 5 },
  { to: 'Pioneer Road',   price: 55, date: 'Yesterday, 17:30', rating: 5 },
  { to: 'Sefika Complex', price: 40, date: 'Jun 13, 14:05',    rating: 4 },
]

const HomeDashboard = ({ pickup, setPickup, destination, setDestination, price, onRequest }) => {
  const [focused, setFocused] = useState(null)
  const canRequest = destination.trim().length > 0

  const pickSaved = (sub) => {
    setDestination(sub)
  }

  const pickRecent = (to) => {
    setDestination(to)
  }

  return (
    <div className="tab-screen home-dashboard">
      {/* ── Top header ── */}
      <div className="home-dash-header">
        <div className="top-bar__logo">
          <div className="top-bar__logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" />
              <circle cx="12" cy="9" r="2.5" fill="#0A0A0A" />
            </svg>
          </div>
          Leeto
        </div>
        <div className="dashboard-avatar-sm">JD</div>
      </div>

      {/* Scrollable body */}
      <div className="home-dash-body">

        {/* ── Booking form ── */}
        <div className="home-dash-booking">
          <p className="greeting-text" style={{ marginBottom: 16 }}>Where are you going?</p>

          <div className="route-inputs">
            <div className="route-line">
              <div className="route-dot route-dot--pickup" />
              <div className="route-connector" />
              <div className="route-dot route-dot--dropoff" />
            </div>
            <div className="inputs-stack">
              <div className={`input-field ${focused === 'pickup' ? 'input-field--focused' : ''}`}>
                <input
                  type="text"
                  placeholder="Your pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setFocused('pickup')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div style={{ height: 4 }} />
              <div className={`input-field ${focused === 'destination' ? 'input-field--focused' : ''}`}>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setFocused('destination')}
                  onBlur={() => setFocused(null)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {canRequest && (
            <div className="price-card">
              <div className="price-card__icon"><DollarSign size={20} fill="currentColor" strokeWidth={1.5} /></div>
              <div className="price-card__info">
                <p className="price-label">Estimated Fare</p>
                <p className="price-value">M {price}.00</p>
              </div>
              <span className="price-card__badge">Fixed</span>
            </div>
          )}

          <button
            className={`request-btn ${canRequest ? 'request-btn--active' : 'request-btn--disabled'}`}
            onClick={onRequest}
            disabled={!canRequest}
          >
            {canRequest ? 'Request Ride' : 'Enter a destination'}
          </button>

          <p className="safety-note">
            <Shield size={12} fill="currentColor" />
            Fixed price · No surge · Verified drivers
          </p>
        </div>

        {/* ── Saved Places ── */}
        <div className="dashboard-section">
          <p className="dashboard-section-title">Saved Places</p>
          <div className="quick-dest-list">
            {QUICK_DESTINATIONS.map((d) => (
              <button key={d.label} className="quick-dest-item" onClick={() => pickSaved(d.sub)}>
                <div className="quick-dest-icon">{d.icon}</div>
                <div className="quick-dest-info">
                  <span className="quick-dest-label">{d.label}</span>
                  <span className="quick-dest-sub">{d.sub}</span>
                </div>
                <ArrowRight size={14} color="var(--text-4)" fill="currentColor" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Rides ── */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <p className="dashboard-section-title">Recent Rides</p>
            <button className="dashboard-see-all">See all</button>
          </div>
          <div className="recent-rides-list">
            {RECENT_RIDES.map((ride, i) => (
              <button key={i} className="recent-ride-card" onClick={() => pickRecent(ride.to)}>
                <div className="recent-ride-icon">
                  <Car size={18} color="var(--teal)" fill="currentColor" />
                </div>
                <div className="recent-ride-info">
                  <span className="recent-ride-to">{ride.to}</span>
                  <div className="recent-ride-meta">
                    <Clock size={11} color="var(--text-3)" fill="currentColor" />
                    <span className="recent-ride-date">{ride.date}</span>
                    <span className="recent-ride-dot">·</span>
                    <span className="recent-ride-price">M {ride.price}.00</span>
                  </div>
                </div>
                <div className="recent-ride-rating">
                  <Star size={12} fill="#F59E0B" color="#F59E0B" />
                  <span>{ride.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Promo ── */}
        <div className="dashboard-section" style={{ paddingBottom: 16 }}>
          <div className="promo-banner">
            <div className="promo-banner-content">
              <Zap size={18} color="#F59E0B" fill="#F59E0B" />
              <div>
                <p className="promo-title">Fixed Prices. Always.</p>
                <p className="promo-sub">No surge pricing — ever. What you see is what you pay.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomeDashboard

