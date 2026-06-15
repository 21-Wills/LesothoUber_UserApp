import { useState } from 'react'
import { Calendar, Clock, DollarSign, CheckCircle, Trash2, Star, Car } from 'lucide-react'

// Pool of drivers to assign to scheduled rides
const DRIVER_POOL = [
  { name: 'Thabo Molefe',   vehicle: 'Honda Fit',       color: 'Silver', plate: 'A 123-456 LS', rating: 4.92, avatar: 'TM' },
  { name: 'Lehlohonolo K.', vehicle: 'Toyota Corolla',  color: 'White',  plate: 'B 098-321 LS', rating: 4.87, avatar: 'LK' },
  { name: 'Mpho Ramaili',   vehicle: 'VW Polo',         color: 'Grey',   plate: 'C 445-112 LS', rating: 4.95, avatar: 'MR' },
]

const UPCOMING = [
  {
    id: 1,
    pickup: 'Current Location',
    destination: 'Maseru Mall',
    date: 'Mon, Jun 23',
    time: '08:00 AM',
    price: 45,
    driver: DRIVER_POOL[0],
  },
  {
    id: 2,
    pickup: '14 Moshoeshoe Rd',
    destination: 'Lesotho Sun Hotel',
    date: 'Wed, Jun 25',
    time: '06:30 PM',
    price: 60,
    driver: DRIVER_POOL[2],
  },
]

// Tomorrow's date as YYYY-MM-DD
const tomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

// 7 days from now
const maxDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
}

const fmtDate = (dateStr) =>
  dateStr
    ? new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
      })
    : ''

const fmtTime = (timeStr) =>
  timeStr
    ? new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
      })
    : ''

const ScheduleScreen = () => {
  const [pickup, setPickup]           = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate]               = useState('')
  const [time, setTime]               = useState('')
  const [focused, setFocused]         = useState(null)
  const [scheduled, setScheduled]     = useState(UPCOMING)
  const [success, setSuccess]         = useState(false)

  const canSchedule =
    pickup.trim().length > 0 &&
    destination.trim().length > 0 &&
    date.length > 0 &&
    time.length > 0

  const handleSchedule = () => {
    if (!canSchedule) return
    const driver = DRIVER_POOL[Math.floor(Math.random() * DRIVER_POOL.length)]
    setScheduled((prev) => [
      {
        id: Date.now(),
        pickup,
        destination,
        date: fmtDate(date),
        time: fmtTime(time),
        price: 45,
        driver,
      },
      ...prev,
    ])
    setPickup('')
    setDestination('')
    setDate('')
    setTime('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3500)
  }

  const removeScheduled = (id) =>
    setScheduled((prev) => prev.filter((r) => r.id !== id))

  return (
    <div className="tab-screen schedule-screen">
      {/* Header */}
      <div className="schedule-header">
        <h1 className="schedule-title">Schedule a Ride</h1>
        <p className="schedule-subtitle">Plan ahead — book up to 7 days in advance</p>
      </div>

      <div className="schedule-body">
        {/* Success toast */}
        {success && (
          <div className="schedule-toast">
            <CheckCircle size={16} color="var(--green)" />
            <span>Ride scheduled successfully!</span>
          </div>
        )}

        {/* ── Form ── */}
        <div className="schedule-form-card">
          {/* Route inputs */}
          <div className="route-inputs" style={{ marginBottom: 14 }}>
            <div className="route-line">
              <div className="route-dot route-dot--pickup" />
              <div className="route-connector" />
              <div className="route-dot route-dot--dropoff" />
            </div>
            <div className="inputs-stack">
              <div className={`input-field ${focused === 'pickup' ? 'input-field--focused' : ''}`}>
                <input
                  type="text"
                  placeholder="Pickup location"
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
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={() => setFocused('destination')}
                  onBlur={() => setFocused(null)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Date + Time pickers */}
          <div className="schedule-datetime-row">
            {/* Date */}
            <div className={`schedule-dt-field ${focused === 'date' ? 'sdt-focused' : ''}`}>
              <div className="schedule-dt-label">
                <Calendar size={13} color="var(--teal)" />
                <span>Date</span>
              </div>
              <input
                type="date"
                min={tomorrow()}
                max={maxDate()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={() => setFocused('date')}
                onBlur={() => setFocused(null)}
                className="schedule-dt-native"
              />
              <p className="schedule-dt-display">
                {date ? fmtDate(date) : <span className="sdt-placeholder">Select date</span>}
              </p>
            </div>

            {/* Time */}
            <div className={`schedule-dt-field ${focused === 'time' ? 'sdt-focused' : ''}`}>
              <div className="schedule-dt-label">
                <Clock size={13} color="var(--blue)" />
                <span>Time</span>
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onFocus={() => setFocused('time')}
                onBlur={() => setFocused(null)}
                className="schedule-dt-native"
              />
              <p className="schedule-dt-display">
                {time ? fmtTime(time) : <span className="sdt-placeholder">Select time</span>}
              </p>
            </div>
          </div>

          {/* Price card */}
          {canSchedule && (
            <div className="price-card" style={{ marginTop: 14, marginBottom: 0 }}>
              <div className="price-card__icon"><DollarSign size={20} /></div>
              <div className="price-card__info">
                <p className="price-label">Estimated Fare</p>
                <p className="price-value">M 45.00</p>
              </div>
              <span className="price-card__badge">Fixed</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ padding: '0 20px' }}>
          <button
            className={`request-btn ${canSchedule ? 'request-btn--active' : 'request-btn--disabled'}`}
            onClick={handleSchedule}
            disabled={!canSchedule}
          >
            {canSchedule ? 'Confirm Schedule' : 'Fill in all details'}
          </button>
        </div>

        {/* ── Upcoming rides ── */}
        {scheduled.length > 0 && (
          <div className="schedule-upcoming">
            <p className="dashboard-section-title" style={{ padding: '16px 20px 10px' }}>
              Upcoming Rides
            </p>
            <div className="schedule-upcoming-list">
              {scheduled.map((r) => (
                <div key={r.id} className="schedule-upcoming-card">
                  {/* Date + time strip */}
                  <div className="schedule-upcoming-times">
                    <div className="schedule-upcoming-date">
                      <Calendar size={13} color="var(--teal)" />
                      <span>{r.date}</span>
                    </div>
                    <div className="schedule-upcoming-time">
                      <Clock size={13} color="var(--text-3)" />
                      <span>{r.time}</span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="schedule-upcoming-route">
                    <div className="sched-route-row">
                      <div className="sched-dot sched-dot--blue" />
                      <span className="sched-location">{r.pickup}</span>
                    </div>
                    <div className="sched-connector" />
                    <div className="sched-route-row">
                      <div className="sched-dot sched-dot--green" />
                      <span className="sched-location">{r.destination}</span>
                    </div>
                  </div>

                  {/* Driver details */}
                  <div className="sched-driver-row">
                    <div className="sched-driver-avatar">{r.driver.avatar}</div>
                    <div className="sched-driver-info">
                      <span className="sched-driver-name">{r.driver.name}</span>
                      <span className="sched-driver-vehicle">
                        {r.driver.color} {r.driver.vehicle} · {r.driver.plate}
                      </span>
                    </div>
                    <div className="sched-driver-rating">
                      <Star size={11} fill="#F59E0B" color="#F59E0B" />
                      <span>{r.driver.rating}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="schedule-upcoming-footer">
                    <span className="trip-price">M {r.price}.00</span>
                    <button className="schedule-cancel-btn" onClick={() => removeScheduled(r.id)}>
                      <Trash2 size={13} />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScheduleScreen
