import { useState } from 'react'
import MapBackground from './MapBackground'
import { MapPin, Navigation, DollarSign, Shield } from 'lucide-react'

const HomeScreen = ({ pickup, setPickup, destination, setDestination, price, onRequest }) => {
  const [focused, setFocused] = useState(null)
  const canRequest = destination.trim().length > 0

  return (
    <div className="screen home-screen">
      <MapBackground state="idle" />

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar__logo">
          <div className="top-bar__logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="white"
              />
              <circle cx="12" cy="9" r="2.5" fill="#0A0A0A" />
            </svg>
          </div>
          Leeto
        </div>
        <button className="profile-btn" aria-label="Profile">
          <span className="avatar-sm">J</span>
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="bottom-sheet">
        <div className="sheet-handle" />

        <div className="sheet-greeting">
          <p className="greeting-text">Where are you going?</p>
        </div>

        {/* Route Inputs */}
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
            <div style={{ height: '4px' }} />
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

        {/* Price Card */}
        {canRequest && (
          <div className="price-card">
            <div className="price-card__icon">
              <DollarSign size={20} fill="currentColor" strokeWidth={1.5} />
            </div>
            <div className="price-card__info">
              <p className="price-label">Estimated Fare</p>
              <p className="price-value">M {price}.00</p>
            </div>
            <span className="price-card__badge">Fixed</span>
          </div>
        )}

        {/* CTA */}
        <button
          className={`request-btn ${canRequest ? 'request-btn--active' : 'request-btn--disabled'}`}
          onClick={onRequest}
          disabled={!canRequest}
        >
          {canRequest ? 'Request Ride' : 'Enter a destination'}
        </button>

        {/* Safety note */}
        <p className="safety-note">
          <Shield size={12} fill="currentColor" />
          Fixed price · No surge · Verified drivers
        </p>
      </div>
    </div>
  )
}

export default HomeScreen
