import { Star, X, Car, Route, Calendar, MessageCircle, CheckCircle, Languages, ThumbsUp } from 'lucide-react'

const DriverProfile = ({ driver, onClose }) => {
  const yearsActive = new Date().getFullYear() - driver.joinedYear

  const stats = [
    { icon: <Star size={16} fill="#F59E0B" color="#F59E0B" />, label: 'Rating',      value: driver.rating,                      unit: '/ 5.0' },
    { icon: <Car size={16} color="var(--teal)" />,             label: 'Total Trips',  value: driver.trips.toLocaleString(),       unit: 'rides'  },
    { icon: <Route size={16} color="var(--blue)" />,           label: 'Total KM',     value: driver.totalKm.toLocaleString(),     unit: 'km'     },
    { icon: <Calendar size={16} color="var(--text-3)" />,      label: 'Driving Since', value: driver.joinedYear,                 unit: `(${yearsActive}y)` },
    { icon: <MessageCircle size={16} color="var(--green)" />,  label: 'Response Rate', value: `${driver.responseRate}%`,         unit: ''       },
    { icon: <CheckCircle size={16} color="var(--green)" />,    label: 'Completion',    value: `${driver.completionRate}%`,       unit: ''       },
  ]

  return (
    <>
      {/* Scrim */}
      <div className="profile-scrim" onClick={onClose} />

      {/* Drawer */}
      <div className="profile-drawer" role="dialog" aria-modal="true">
        <div className="sheet-handle" />

        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar-lg">
            {driver.avatar}
            <div className="profile-avatar-badge">
              <Star size={10} fill="#F59E0B" color="#F59E0B" />
              <span>{driver.rating}</span>
            </div>
          </div>

          <div className="profile-header-info">
            <h2 className="profile-name">{driver.name}</h2>
            <p className="profile-vehicle">{driver.color} {driver.vehicle} · {driver.plate}</p>
            <div className="profile-verified-row">
              <span className="verified-badge">
                <CheckCircle size={12} />
                Verified Driver
              </span>
              <span className="lang-badge">
                <Languages size={12} />
                {driver.languages.join(' · ')}
              </span>
            </div>
          </div>

          <button className="profile-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Stats grid */}
        <div className="profile-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="profile-stat-card">
              <div className="profile-stat-icon">{s.icon}</div>
              <p className="profile-stat-value">{s.value} <span className="profile-stat-unit">{s.unit}</span></p>
              <p className="profile-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="profile-section">
          <p className="profile-section-title">About</p>
          <p className="profile-about">{driver.about}</p>
        </div>

        {/* Reviews */}
        <div className="profile-section">
          <p className="profile-section-title">Recent Reviews</p>
          <div className="review-list">
            {driver.reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-top">
                  <div className="review-avatar">{r.author[0]}</div>
                  <div className="review-meta">
                    <span className="review-author">{r.author}</span>
                    <div className="review-stars">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <Star key={j} size={11} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                  </div>
                  <ThumbsUp size={14} color="var(--text-4)" />
                </div>
                <p className="review-text">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DriverProfile
