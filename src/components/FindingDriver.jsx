import { Car3D, Taxi3D } from './VehicleIcons'

const FindingDriver = ({ pickup, destination, price, onCancel }) => {
  return (
    <div className="screen finding-screen">
      {/* ── Radar animation ── */}
      <div className="radar-container">
        <div className="radar-rings">
          <div className="radar-ring" />
          <div className="radar-ring" />
          <div className="radar-ring" />
          <div className="radar-ring" />

          {/* Center pin */}
          <div className="radar-center">
            <Car3D size={28} />
          </div>

          {/* Orbiting vehicles */}
          <div className="nearby-car nearby-car--1">
            <Car3D size={18} />
          </div>
          <div className="nearby-car nearby-car--2">
            <Taxi3D size={22} />
          </div>
          <div className="nearby-car nearby-car--3">
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

        <button className="cancel-btn" onClick={onCancel}>
          Cancel Request
        </button>
      </div>
    </div>
  )
}

export default FindingDriver
