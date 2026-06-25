import { useState } from 'react'
import DriverProfile from './DriverProfile'
import { Phone, Star, X, ChevronRight, MapPin, Navigation } from 'lucide-react'

const DriverMatched = ({ driver, pickup, destination, price, onCancel }) => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="screen matched-screen">
      {/* ── Journey visual (replaces map) ── */}
      <div className="journey-visual">
        <div className="journey-card">
          {/* Pickup */}
          <div className="journey-node">
            <div className="journey-icon journey-icon--pickup">
              <MapPin size={20} fill="currentColor" color="var(--blue)" />
            </div>
            <div className="journey-info">
              <p className="journey-label">Pickup</p>
              <p className="journey-location">{pickup || 'Current Location'}</p>
            </div>
          </div>

          {/* Connector: Pickup → Driver */}
          <div className="journey-connector">
            <div className="journey-line" />
            <span className="journey-segment-label">{driver.distance} · {driver.eta} min</span>
            <div className="journey-line" />
          </div>

          {/* Driver */}
          <div className="journey-node journey-node--driver">
            <div className="journey-icon journey-icon--driver">
              <div className="journey-driver-avatar">{driver.avatar}</div>
            </div>
            <div className="journey-info">
              <p className="journey-label">{driver.name}</p>
              <p className="journey-sublabel">{driver.color} {driver.vehicle} · {driver.plate}</p>
            </div>
          </div>

          {/* Connector: Driver → Destination */}
          <div className="journey-connector">
            <div className="journey-line" />
            <span className="journey-segment-label">~15 min trip</span>
            <div className="journey-line" />
          </div>

          {/* Destination */}
          <div className="journey-node">
            <div className="journey-icon journey-icon--dest">
              <Navigation size={20} fill="currentColor" color="var(--green)" />
            </div>
            <div className="journey-info">
              <p className="journey-label">Destination</p>
              <p className="journey-location">{destination}</p>
            </div>
          </div>
        </div>
      </div>

      {showProfile && (
        <DriverProfile driver={driver} onClose={() => setShowProfile(false)} />
      )}

      <div className="matched-sheet">
        <div className="sheet-handle" />

        {/* Match badge */}
        <div className="match-badge">
          <div className="match-badge-dot" />
          <span className="match-badge-text">Driver Found</span>
        </div>

        {/* Driver card — tappable to open profile */}
        <button className="driver-card driver-card--tappable" onClick={() => setShowProfile(true)}>
          <div className="driver-avatar">{driver.avatar}</div>
          <div className="driver-info">
            <p className="driver-name">{driver.name}</p>
            <p className="driver-vehicle">
              {driver.color} {driver.vehicle}
            </p>
            <div className="driver-meta">
              <div className="rating-badge">
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span>{driver.rating}</span>
              </div>
              <span className="plate-badge">{driver.plate}</span>
            </div>
          </div>
          <div className="driver-card__chevron">
            <ChevronRight size={16} color="var(--text-4)" />
          </div>
        </button>

        {/* Action buttons */}
        <div className="action-buttons">
          <button className="contact-btn">
            <Phone size={16} />
            Contact Driver
          </button>
          <button className="cancel-ride-btn" onClick={onCancel}>
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DriverMatched
