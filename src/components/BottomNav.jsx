import { Home, Calendar, Bell, User } from 'lucide-react'

const TABS = [
  { id: 'home',          label: 'Home',     Icon: Home     },
  { id: 'book',          label: 'Schedule', Icon: Calendar },
  { id: 'notifications', label: 'Alerts',   Icon: Bell     },
  { id: 'account',       label: 'Account',  Icon: User     },
]

const BottomNav = ({ active, onChange, notifCount = 2 }) => (
  <nav className="bottom-nav">
    {TABS.map(({ id, label, Icon }) => (
      <button
        key={id}
        className={`bottom-nav__tab ${active === id ? 'bottom-nav__tab--active' : ''}`}
        onClick={() => onChange(id)}
      >
        <div className="bottom-nav__icon-wrap">
          <Icon size={22} strokeWidth={active === id ? 2.2 : 1.8} />
          {id === 'notifications' && notifCount > 0 && (
            <span className="bottom-nav__badge">{notifCount}</span>
          )}
        </div>
        <span className="bottom-nav__label">{label}</span>
      </button>
    ))}
  </nav>
)

export default BottomNav
