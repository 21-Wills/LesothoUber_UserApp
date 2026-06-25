import { Home, Calendar, Bell, User } from 'lucide-react'

const TABS = [
  { id: 'home',          label: 'Home',     Icon: Home     },
  { id: 'book',          label: 'Schedule', Icon: Calendar },
  { id: 'notifications', label: 'Alerts',   Icon: Bell     },
  { id: 'account',       label: 'Account',  Icon: User     },
]

const BottomNav = ({ active, onChange, notifCount = 2 }) => (
  <nav className="floating-nav">
    <div className="floating-nav__track">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            className={`floating-nav__tab ${isActive ? 'floating-nav__tab--active' : ''}`}
            onClick={() => onChange(id)}
          >
            <div className="floating-nav__icon-wrap">
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              {id === 'notifications' && notifCount > 0 && (
                <span className="floating-nav__badge">{notifCount}</span>
              )}
            </div>
            <span className="floating-nav__label">{label}</span>
          </button>
        )
      })}
    </div>
  </nav>
)

export default BottomNav
