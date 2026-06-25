import { Bell, Car, Tag, CheckCircle } from 'lucide-react'

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'ride',
    icon: Car,
    iconColor: 'var(--teal)',
    title: 'Ride Completed',
    body: 'Your ride to Maseru Mall is complete. Total: M 45.00',
    time: '9:18 AM',
    read: false,
  },
  {
    id: 2,
    type: 'promo',
    icon: Tag,
    iconColor: '#F59E0B',
    title: '10% Off Your Next Ride',
    body: 'Use code RIDE10 before end of June to save on your next trip.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: 3,
    type: 'ride',
    icon: Car,
    iconColor: 'var(--teal)',
    title: 'Ride Completed',
    body: 'Your ride to Pioneer Road with Thabo M. is complete. M 55.00.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 4,
    type: 'system',
    icon: CheckCircle,
    iconColor: 'var(--green)',
    title: 'Account Verified',
    body: 'Your phone number and email have been verified successfully.',
    time: 'Jun 13',
    read: true,
  },
  {
    id: 5,
    type: 'promo',
    icon: Tag,
    iconColor: '#F59E0B',
    title: 'Welcome to Leeto!',
    body: 'Your first ride is on us. Enjoy a free trip up to M 50.',
    time: 'Jun 10',
    read: true,
  },
]

const NotificationsScreen = () => {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <div className="tab-screen notif-screen">
      {/* Header */}
      <div className="notif-header">
        <h1 className="notif-title">Notifications</h1>
        {unread > 0 && (
          <span className="notif-unread-badge">{unread} new</span>
        )}
      </div>

      {/* List */}
      <div className="notif-list">
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`notif-item ${!n.read ? 'notif-item--unread' : ''}`}
          >
            <div
              className="notif-item-icon"
              style={{ background: `${n.iconColor}18`, border: `1px solid ${n.iconColor}30` }}
            >
              <n.icon size={18} color={n.iconColor} strokeWidth={1.8} />
            </div>
            <div className="notif-item-content">
              <div className="notif-item-top">
                <span className="notif-item-title">{n.title}</span>
                <span className="notif-item-time">{n.time}</span>
              </div>
              <p className="notif-item-body">{n.body}</p>
            </div>
            {!n.read && <div className="notif-dot" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsScreen
