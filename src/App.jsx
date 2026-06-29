import { useState, useEffect, useRef, useCallback } from 'react'
import HomeDashboard from './components/HomeDashboard'
import HomeScreen from './components/HomeScreen'
import ScheduleScreen from './components/ScheduleScreen'
import FindingDriver from './components/FindingDriver'
import DriverMatched from './components/DriverMatched'
import AccountScreen from './components/AccountScreen'
import NotificationsScreen from './components/NotificationsScreen'
import BottomNav from './components/BottomNav'
import AuthScreen from './components/AuthScreen'
import { useSignalR } from './hooks/useSignalR'
import './App.css'

const FIXED_PRICE = 45

// Tabs that show the bottom nav
const NAV_TABS = ['home', 'book', 'notifications', 'account']

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState('home')
  const [rideFlow, setRideFlow] = useState('idle') // 'idle' | 'finding' | 'matched'
  const [pickup, setPickup] = useState('Current Location')
  const [destination, setDestination] = useState('')
  const [matchedDriver, setMatchedDriver] = useState(null)
  const [signalRStatus, setSignalRStatus] = useState('disconnected')

  // ── SignalR hook ──────────────────────────────────────────────────────
  const userId = user?.phone || user?.id || 'passenger'
  const { connect, broadcastRide, cancelRide, disconnect, status } = useSignalR(userId)

  // Keep local status in sync
  useEffect(() => {
    setSignalRStatus(status)
  }, [status])

  // ── Ride request via SignalR ──────────────────────────────────────────
  const requestRide = useCallback(async () => {
    if (!destination.trim()) return

    setRideFlow('finding')

    const ridePayload = {
      userId,
      pickupLocation: pickup,
      destination: destination.trim(),
      price: FIXED_PRICE,
      timestamp: Date.now(),
    }

    // Step 1: Open the WebSocket connection (best effort, for receiving events).
    //         Do NOT block on this — the REST API call below is independent.
    connect({
      onRideAccepted: (data) => {
        setMatchedDriver({
          name: data.driverName || 'Driver',
          rating: data.rating || 4.8,
          trips: data.trips || 0,
          vehicle: data.vehicle || '4+1 Taxi',
          color: data.color || 'White',
          plate: data.plate || '',
          eta: data.eta || 5,
          distance: data.distance || 'Nearby',
          avatar: (data.driverName || 'D').charAt(0).toUpperCase(),
          phone: data.phone || '',
          totalKm: data.totalKm || 0,
          joinedYear: data.joinedYear || 2023,
          responseRate: data.responseRate || 95,
          completionRate: data.completionRate || 94,
          cancelRate: data.cancelRate || 3,
          languages: data.languages || ['Sesotho', 'English'],
          about: data.about || 'Professional driver.',
          reviews: data.reviews || [],
        })
        setRideFlow('matched')
      },
      onRideDeclined: (data) => {
        console.log('Ride declined:', data)
        setRideFlow('idle')
        setTab('book')
      },
      onStatusChange: () => {},
    }).catch(() => {
      // WebSocket failed — that's OK. The ride request still went out
      // via the REST API below. We just won't get real-time responses.
    })

    // Step 2: Broadcast ride request via REST API (POST /api/group-send).
    //         This is the actual "SignalR broadcast to the drivers group".
    try {
      await broadcastRide(ridePayload)
    } catch (e) {
      console.error('Failed to send ride request:', e)
      // Stay on finding screen — the user can retry or cancel
      return
    }
  }, [destination, pickup, userId, connect, broadcastRide])

  // ── Cancel ride ───────────────────────────────────────────────────────
  const handleCancelRide = useCallback(async () => {
    try {
      await cancelRide({
        userId,
        pickupLocation: pickup,
        destination: destination.trim(),
        price: FIXED_PRICE,
      })
    } catch (_) { /* best effort */ }

    setRideFlow('idle')
    setMatchedDriver(null)
    setTab('book')
  }, [userId, pickup, destination, cancelRide])

  // ── Auth ──────────────────────────────────────────────────────────────
  const handleSignIn = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleSignOut = () => {
    disconnect()
    setUser(null)
    setIsAuthenticated(false)
    setRideFlow('idle')
    setMatchedDriver(null)
    setTab('home')
  }

  const inRideFlow = rideFlow !== 'idle'

  return (
    <div className="app">
      {/* ── Auth gate ── */}
      {!isAuthenticated && <AuthScreen onSignIn={handleSignIn} />}

      {/* ── Ride flow screens (full-screen, no nav) ── */}
      {isAuthenticated && inRideFlow && rideFlow === 'finding' && (
        <FindingDriver
          pickup={pickup}
          destination={destination}
          price={FIXED_PRICE}
          signalRStatus={signalRStatus}
          onCancel={handleCancelRide}
        />
      )}
      {isAuthenticated && inRideFlow && rideFlow === 'matched' && matchedDriver && (
        <DriverMatched
          driver={matchedDriver}
          pickup={pickup}
          destination={destination}
          price={FIXED_PRICE}
          onCancel={handleCancelRide}
        />
      )}

      {/* ── Tabbed screens (with bottom nav) ── */}
      {isAuthenticated && !inRideFlow && (
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
          {tab === 'account'       && <AccountScreen user={user} onSignOut={handleSignOut} />}

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

