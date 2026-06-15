import { useState } from 'react'
import MapBackground from './MapBackground'
import DriverProfile from './DriverProfile'
import { Clock, Phone, Star, X, ChevronRight } from 'lucide-react'

const DriverMatched = ({ driver, pickup, destination, price, onCancel }) => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="screen matched-screen">
      <MapBackground state="matched" />

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
                <Star size={13} fill="currentColor" color="#F59E0B" />
                <span>{driver.rating}</span>
              </div>
              <span className="plate-badge">{driver.plate}</span>
            </div>
          </div>
          <div className="driver-card__chevron">
            <ChevronRight size={16} color="var(--text-4)" />
          </div>
        </button>

        {/* ETA card */}
        <div className="eta-card">
          <div className="eta-left">
            <div className="eta-icon">
              <Clock size={20} strokeWidth={2} />
            </div>
            <div>
              <p className="eta-label">ETA</p>
              <p className="eta-value">{driver.eta} min away</p>
            </div>
          </div>
          <span className="eta-distance">{driver.distance}</span>
        </div>

        {/* Route summary */}
        <div className="route-summary">
          <div className="trip-row">
            <div className="trip-dot trip-dot--blue" />
            <span className="trip-location">{pickup || 'Current Location'}</span>
          </div>
          <div className="trip-row">
            <div className="trip-dot trip-dot--green" />
            <span className="trip-location">{destination}</span>
            <span className="trip-price">M {price}.00</span>
          </div>
        </div>

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
