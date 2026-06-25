import { useState } from 'react'
import { Phone, ArrowRight, Shield, ChevronLeft, MapPin } from 'lucide-react'

const AuthScreen = ({ onSignIn }) => {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [step, setStep] = useState('phone') // 'phone' | 'otp'
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])

  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '')
    if (digits.length <= 4) return digits
    if (digits.length <= 7) return digits.slice(0, 4) + ' ' + digits.slice(4)
    return digits.slice(0, 4) + ' ' + digits.slice(4, 7) + ' ' + digits.slice(7, 10)
  }

  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(formatPhone(raw))
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    // Auto-advance
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const canSendOtp = phone.replace(/\s/g, '').length >= 8
  const canVerify = otp.every(d => d !== '')
  const canSignUp = firstName.trim() && lastName.trim() && canSendOtp

  const sendOtp = () => {
    if (!canSendOtp) return
    setStep('otp')
  }

  const verifyOtp = () => {
    if (!canVerify) return
    // Simulate auth — in production, verify with backend
    const user = {
      name: `${firstName || 'Rider'} ${lastName || ''}`.trim(),
      phone: '+266 ' + phone.replace(/\s/g, ''),
      avatar: (firstName?.charAt(0) || 'R') + (lastName?.charAt(0) || ''),
    }
    onSignIn(user)
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setStep('phone')
    setOtp(['', '', '', ''])
  }

  return (
    <div className="auth-screen">
      {/* Background gradient */}
      <div className="auth-bg" />

      <div className="auth-content">
        {/* Back button */}
        {step === 'otp' && (
          <button className="auth-back" onClick={() => setStep('phone')}>
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <MapPin size={22} color="#FFFFFF" fill="#FFFFFF" fillOpacity={0.15} />
          </div>
          <span className="auth-logo-text">Leeto</span>
        </div>

        {/* Step: phone entry */}
        {step === 'phone' && (
          <div className="auth-form">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${mode === 'signin' ? 'auth-tab--active' : ''}`}
                onClick={() => setMode('signin')}
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </div>

            <h2 className="auth-heading">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="auth-sub">
              {mode === 'signin'
                ? 'Enter your phone number to sign in.'
                : 'Sign up in seconds and start riding.'}
            </p>

            {mode === 'signup' && (
              <div className="auth-name-row">
                <input
                  className="auth-input"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            )}

            <div className="auth-phone-wrap">
              <span className="auth-phone-prefix">+266</span>
              <input
                className="auth-input auth-input--phone"
                type="tel"
                placeholder="58 123 4567"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={12}
              />
            </div>

            <button
              className={`auth-btn ${canSendOtp ? 'auth-btn--active' : 'auth-btn--disabled'}`}
              onClick={sendOtp}
              disabled={!canSendOtp}
            >
              <span>Send code</span>
              <ArrowRight size={18} />
            </button>

            <p className="auth-switch">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button className="auth-switch-btn" onClick={switchMode}>
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        )}

        {/* Step: OTP verification */}
        {step === 'otp' && (
          <div className="auth-form">
            <div className="auth-otp-icon">
              <div className="auth-otp-icon-circle">
                <Phone size={20} />
              </div>
            </div>
            <h2 className="auth-heading">Enter verification code</h2>
            <p className="auth-sub">
              We sent a 4-digit code to{' '}
              <strong>+266 {phone}</strong>
            </p>

            <div className="auth-otp-row">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className={`auth-otp-input ${digit ? 'auth-otp-input--filled' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button
              className={`auth-btn ${canVerify ? 'auth-btn--active' : 'auth-btn--disabled'}`}
              onClick={verifyOtp}
              disabled={!canVerify}
            >
              <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
              <ArrowRight size={18} />
            </button>

            <p className="auth-resend">
              Didn&apos;t get a code?{' '}
              <button className="auth-switch-btn" onClick={sendOtp}>Resend</button>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="auth-footer">
          <Shield size={12} />
          <span>Your data is secure & encrypted</span>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen
