import { useState } from 'react'
import DriverProfile from './DriverProfile'
import { Phone, Star, X, ChevronRight, MapPin, Navigation, User } from 'lucide-react'

const DriverMatched = ({ driver, pickup, destination, price, onCancel }) => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="screen matched-screen">
      {/* ── Single-line journey graphic ── */}
      <div className="trip-line-visual">
        {/* Driver node */}
        <div className="trip-line-node">
          <div className="trip-line-avatar">
            <div className="trip-line-avatar-inner">{driver.avatar}</div>
          </div>
          <span className="trip-line-node-label">{driver.name.split(' ')[0]}</span>
        </div>

        {/* Arrow segment: Driver → Pickup */}
        <div className="trip-line-segment">
          <div className="trip-line-arrow-bar">
            <div className="trip-line-dot trip-line-dot--car" />
            <div className="trip-line-bar trip-line-bar--to-pickup">
              <div className="trip-line-bar-fill" />
            </div>
            <div className="trip-line-dot trip-line-dot--pickup" />
          </div>
          <span className="trip-line-seg-label">{driver.distance} · {driver.eta} min</span>
        </div>

        {/* Pickup node */}
        <div className="trip-line-node">
          <div className="trip-line-icon trip-line-icon--pickup">
            <MapPin size={16} fill="currentColor" color="var(--blue)" />
          </div>
          <span className="trip-line-node-label">You</span>
        </div>

        {/* Arrow segment: Pickup → Destination */}
        <div className="trip-line-segment">
          <div className="trip-line-arrow-bar">
            <div className="trip-line-dot trip-line-dot--start" />
            <div className="trip-line-bar trip-line-bar--to-dest">
              <div className="trip-line-bar-fill" />
            </div>
            <div className="trip-line-dot trip-line-dot--dest" />
          </div>
          <span className="trip-line-seg-label">~15 min trip</span>
        </div>

        {/* Destination node */}
        <div className="trip-line-node">
          <div className="trip-line-icon trip-line-icon--dest">
            <Navigation size={16} fill="currentColor" color="var(--green)" />
          </div>
          <span className="trip-line-node-label">{destination}</span>
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
