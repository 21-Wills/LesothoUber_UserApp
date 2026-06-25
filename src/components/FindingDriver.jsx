import { Car3D } from './VehicleIcons'
import { MapPin, Navigation } from 'lucide-react'

const FindingDriver = ({ pickup, destination, price, onCancel }) => {
  return (
    <div className="screen finding-screen">
      {/* ── Journey visual with radar overlay ── */}
      <div className="journey-visual finding-visual">
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

          {/* Searching connector with radar */}
          <div className="journey-connector journey-connector--searching">
            <div className="journey-line" />
            <div className="journey-radar-badge">
              <div className="journey-radar-rings">
                <div className="journey-radar-ring" />
                <div className="journey-radar-ring" />
                <div className="journey-radar-ring" />
              </div>
              <div className="journey-radar-center">
                <Car3D size={22} />
              </div>
            </div>
            <span className="journey-segment-label">Searching for a driver...</span>
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

      {/* Bottom sheet */}
      <div className="finding-sheet">
        <div className="sheet-handle" />

        <div className="finding-title">
          <div className="spinner" />
          <span>
            Finding your driver
            <span className="finding-dots" />
          </span>
        </div>
        <p className="finding-subtitle">
          Broadcasting to nearby drivers in your area
        </p>

        <button className="cancel-btn" onClick={onCancel}>
          Cancel Request
        </button>
      </div>
    </div>
  )
}

export default FindingDriver
