import { useState, useEffect } from 'react'
import HomeDashboard from './components/HomeDashboard'
import HomeScreen from './components/HomeScreen'
import ScheduleScreen from './components/ScheduleScreen'
import FindingDriver from './components/FindingDriver'
import DriverMatched from './components/DriverMatched'
import AccountScreen from './components/AccountScreen'
import NotificationsScreen from './components/NotificationsScreen'
import BottomNav from './components/BottomNav'
import './App.css'

const FIXED_PRICE = 45

const MOCK_DRIVER = {
  name: 'Thabo Molefe',
  rating: 4.92,
  trips: 1284,
  vehicle: 'Honda Fit',
  color: 'Silver',
  plate: 'A 123-456 LS',
  eta: 4,
  distance: '0.8 km away',
  avatar: 'TM',
  phone: '+266 5891 2345',
  totalKm: 38420,
  joinedYear: 2021,
  responseRate: 98,
  completionRate: 96,
  cancelRate: 2,
  languages: ['Sesotho', 'English'],
  about: 'Professional and punctual driver. I keep my car clean and play music at a comfortable volume. Happy to chat or keep it quiet — your ride, your vibe.',
  reviews: [
    { author: 'Lerato M.', text: 'Super smooth ride, very polite!', stars: 5 },
    { author: 'David K.', text: 'On time and clean car. Recommended.', stars: 5 },
    { author: 'Palesa N.', text: 'Friendly and knew the quickest route.', stars: 4 },
  ],
}

// Tabs that show the bottom nav
const NAV_TABS = ['home', 'book', 'notifications', 'account']

function App() {
  const [tab, setTab] = useState('home')
  const [rideFlow, setRideFlow] = useState('idle') // 'idle' | 'finding' | 'matched'
  const [pickup, setPickup] = useState('Current Location')
  const [destination, setDestination] = useState('')
  const [matchTimer, setMatchTimer] = useState(null)

  const goToBook = () => setTab('book')

  const requestRide = () => {
    if (!destination.trim()) return
    setRideFlow('finding')
    const delay = 3200 + Math.random() * 2000
    const t = setTimeout(() => setRideFlow('matched'), delay)
    setMatchTimer(t)
  }

  const cancelRide = () => {
    if (matchTimer) clearTimeout(matchTimer)
    setMatchTimer(null)
    setRideFlow('idle')
    setTab('book')
  }

  useEffect(() => () => { if (matchTimer) clearTimeout(matchTimer) }, [matchTimer])

  const inRideFlow = rideFlow !== 'idle'

  return (
    <div className="app">
      {/* ── Ride flow screens (full-screen, no nav) ── */}
      {inRideFlow && rideFlow === 'finding' && (
        <FindingDriver
          pickup={pickup}
          destination={destination}
          price={FIXED_PRICE}
          onCancel={cancelRide}
        />
      )}
      {inRideFlow && rideFlow === 'matched' && (
        <DriverMatched
          driver={MOCK_DRIVER}
          pickup={pickup}
          destination={destination}
          price={FIXED_PRICE}
          onCancel={cancelRide}
        />
      )}

      {/* ── Tabbed screens (with bottom nav) ── */}
      {!inRideFlow && (
        <>
          {tab === 'home' && (
            <HomeDashboard
              pickup={pickup}
              setPickup={setPickup}
              destination={destination}
              setDestination={setDestination}
              price={FIXED_PRICE}
              onRequest={requestRide}
            />
          )}
          {tab === 'book' && <ScheduleScreen />}
          {tab === 'notifications' && <NotificationsScreen />}
          {tab === 'account'       && <AccountScreen />}

          <BottomNav
            active={tab}
            onChange={setTab}
            notifCount={2}
          />
        </>
      )}
    </div>
  )
}

export default App

