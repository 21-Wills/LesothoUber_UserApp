import {
  User, Star, Car, Route, Calendar, Shield, ChevronRight,
  CreditCard, Bell, HelpCircle, LogOut, Edit3, Award
} from 'lucide-react'

const MOCK_USER = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+266 5812 3456',
  avatar: 'JD',
  memberSince: 'March 2023',
  totalRides: 47,
  totalSpent: 2115,
  savedPlaces: 3,
  rating: 4.8,
}

const MENU_SECTIONS = [
  {
    title: 'Payment',
    items: [
      { icon: CreditCard, label: 'Payment Methods', sub: 'M-Pesa · **** 4521' },
      { icon: Route,      label: 'Ride History',    sub: `${MOCK_USER.totalRides} completed rides` },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell,       label: 'Notifications',  sub: 'Ride updates & promos' },
      { icon: Shield,     label: 'Safety',         sub: 'Emergency contacts & SOS' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & Support',  sub: 'FAQs, contact us' },
      { icon: Award,      label: 'Rewards',         sub: 'You have 240 pts' },
    ],
  },
]

const AccountScreen = ({ user }) => {
  const displayUser = user?.name
    ? { ...MOCK_USER, ...user, avatar: user.avatar || user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) }
    : MOCK_USER

  return (
    <div className="tab-screen account-screen">

      {/* Header */}
      <div className="account-header">
        <div className="account-avatar">
          {displayUser.avatar}
          <button className="account-avatar-edit" aria-label="Edit photo">
            <Edit3 size={12} />
          </button>
        </div>
        <div className="account-header-info">
          <h1 className="account-name">{displayUser.name}</h1>
          <p className="account-email">{displayUser.phone}</p>
          <p className="account-since">Member since {displayUser.memberSince}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="account-stats">
        <div className="account-stat">
          <span className="account-stat-value">{displayUser.totalRides}</span>
          <span className="account-stat-label">Rides</span>
        </div>
        <div className="account-stat-divider" />
        <div className="account-stat">
          <span className="account-stat-value">M {displayUser.totalSpent.toLocaleString()}</span>
          <span className="account-stat-label">Spent</span>
        </div>
        <div className="account-stat-divider" />
        <div className="account-stat">
          <div className="account-stat-rating">
            <Star size={13} fill="#F59E0B" color="#F59E0B" />
            <span className="account-stat-value">{displayUser.rating}</span>
          </div>
          <span className="account-stat-label">Your Rating</span>
        </div>
      </div>

      {/* Menu sections */}
      <div className="account-menu">
        {MENU_SECTIONS.map((section) => (
          <div key={section.title} className="account-menu-section">
            <p className="account-menu-title">{section.title}</p>
            <div className="account-menu-group">
              {section.items.map((item) => (
                <button key={item.label} className="account-menu-item">
                  <div className="account-menu-item-icon">
                    <item.icon size={17} />
                  </div>
                  <div className="account-menu-item-info">
                    <span className="account-menu-item-label">{item.label}</span>
                    <span className="account-menu-item-sub">{item.sub}</span>
                  </div>
                  <ChevronRight size={16} color="var(--text-4)" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="account-signout-btn">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default AccountScreen
