import MapBackground from './MapBackground'
import { Car3D, Taxi3D } from './VehicleIcons'

const FindingDriver = ({ pickup, destination, price, onCancel }) => {
  return (
    <div className="screen finding-screen">
      <MapBackground state="finding" />

      {/* Radar animation in the map area */}
      <div className="radar-container">
        <div className="radar-rings">
          <div className="radar-ring" />
          <div className="radar-ring" />
          <div className="radar-ring" />
          <div className="radar-ring" />

          {/* Center icon – 3D car */}
          <div className="radar-center">
            <Car3D size={28} />
          </div>

          {/* Nearby vehicle dots */}
          <div className="nearby-car">
            <Car3D size={18} />
          </div>
          <div className="nearby-car">
            <Taxi3D size={22} />
          </div>
          <div className="nearby-car">
            <Car3D size={18} />
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

        {/* Trip summary */}
        <div className="trip-summary">
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

        <button className="cancel-btn" onClick={onCancel}>
          Cancel Request
        </button>
      </div>
    </div>
  )
}

export default FindingDriver
