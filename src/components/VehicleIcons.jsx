import React from 'react'

/* ── Gradients for the 3D "top-down with depth" look ── */
const defs = (
  <defs>
    {/* Car body gradient – dark at bottom (rear) simulating lighting */}
    <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#D4D4DC" />
      <stop offset="50%" stopColor="#C0C0CB" />
      <stop offset="100%" stopColor="#A8A8B4" />
    </linearGradient>
    <linearGradient id="carRoof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E8E8EE" />
      <stop offset="100%" stopColor="#D0D0DA" />
    </linearGradient>
    <linearGradient id="carWindshield" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2D4A7A" />
      <stop offset="100%" stopColor="#1A2D4A" />
    </linearGradient>

    {/* Taxi body gradient – slightly more vibrant */}
    <linearGradient id="taxiBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E8E4D8" />
      <stop offset="50%" stopColor="#D8D2C0" />
      <stop offset="100%" stopColor="#C0B898" />
    </linearGradient>
    <linearGradient id="taxiStripe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2563EB" />
      <stop offset="50%" stopColor="#1D4ED8" />
      <stop offset="100%" stopColor="#1E3A8A" />
    </linearGradient>
    <linearGradient id="taxiRoof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#F0EDE5" />
      <stop offset="100%" stopColor="#D8D2C0" />
    </linearGradient>

    {/* Wheel gradient */}
    <radialGradient id="wheelGrad" cx="40%" cy="35%">
      <stop offset="0%" stopColor="#555" />
      <stop offset="60%" stopColor="#333" />
      <stop offset="100%" stopColor="#1A1A1A" />
    </radialGradient>

    {/* Drop shadow filter */}
    <filter id="carShadow" x="-20%" y="-10%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
    </filter>
    <filter id="carShadowSm" x="-30%" y="-20%" width="160%" height="160%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.2" />
    </filter>
  </defs>
)

/* ── 3D-looking sedan car (top-down perspective) ── */
export const Car3D = ({ size = 36, color = 'default', ...props }) => {
  const w = size
  const h = size * 0.58
  const viewBox = '0 0 36 21'
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" {...props}>
      {defs}
      {/* Shadow beneath car */}
      <ellipse cx="16" cy="19" rx="14" ry="1.5" fill="#000" opacity="0.12" />
      {/* Body */}
      <rect x="2" y="4" width="32" height="13" rx="6" fill="url(#carBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      {/* Roof */}
      <rect x="10" y="1.5" width="16" height="10" rx="4.5" fill="url(#carRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      {/* Windshield */}
      <rect x="23" y="3" width="7" height="7" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
      {/* Rear window */}
      <rect x="6" y="3" width="5" height="7" rx="2" fill="url(#carWindshield)" opacity="0.7" />
      {/* Front bumper shine */}
      <rect x="26" y="7" width="6" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
      {/* Rear lights */}
      <rect x="2" y="7" width="2.5" height="6" rx="1" fill="#EF4444" opacity="0.9" />
      <rect x="2" y="7" width="2.5" height="6" rx="1" fill="#F87171" opacity="0.4" />
      {/* Front wheels */}
      <circle cx="27" cy="17.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
      <circle cx="27" cy="17.5" r="1.2" fill="#444" />
      {/* Rear wheels */}
      <circle cx="9" cy="17.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
      <circle cx="9" cy="17.5" r="1.2" fill="#444" />
      {/* Headlights */}
      <rect x="32" y="6" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
      <rect x="32" y="13" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
    </svg>
  )
}

/* ── 3D-looking minibus taxi (4+1) – longer body ── */
export const Taxi3D = ({ size = 44, ...props }) => {
  const w = size
  const h = size * 0.48
  const viewBox = '0 0 48 23'
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" {...props}>
      {defs}
      {/* Shadow */}
      <ellipse cx="24" cy="21" rx="20" ry="1.5" fill="#000" opacity="0.12" />
      {/* Body */}
      <rect x="2" y="5" width="44" height="14" rx="6.5" fill="url(#taxiBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
      {/* Blue stripe */}
      <rect x="2" y="10" width="44" height="4.5" fill="url(#taxiStripe)" opacity="0.85" />
      {/* Taxi sign on roof */}
      <rect x="18" y="1.5" width="12" height="4" rx="1.5" fill="#FBBF24" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      <text x="24" y="4.8" textAnchor="middle" fontSize="3" fontWeight="700" fill="#1A1A1A" fontFamily="Inter, sans-serif">4+1</text>
      {/* Roof */}
      <rect x="8" y="2.5" width="32" height="9" rx="4.5" fill="url(#taxiRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      {/* Windshield */}
      <rect x="35" y="4" width="10" height="6" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
      {/* Side windows (row) */}
      <rect x="14" y="4" width="6" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.75" />
      <rect x="21.5" y="4" width="6" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.75" />
      <rect x="29" y="4" width="4.5" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.7" />
      {/* Rear window */}
      <rect x="4" y="4" width="4" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.6" />
      {/* Front bumper */}
      <rect x="40" y="8" width="5" height="7" rx="2" fill="rgba(255,255,255,0.12)" />
      {/* Rear lights */}
      <rect x="2" y="8" width="2" height="5" rx="1" fill="#EF4444" opacity="0.85" />
      {/* Front wheels */}
      <circle cx="38" cy="19" r="3" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
      <circle cx="38" cy="19" r="1.4" fill="#444" />
      {/* Rear wheels */}
      <circle cx="10" cy="19" r="3" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
      <circle cx="10" cy="19" r="1.4" fill="#444" />
      {/* Headlights */}
      <rect x="44" y="7" width="1.5" height="3.5" rx="0.8" fill="#FDE68A" opacity="0.8" />
      <rect x="44" y="13.5" width="1.5" height="3.5" rx="0.8" fill="#FDE68A" opacity="0.8" />
      {/* "TAXI" text on side */}
      <rect x="12" y="15" width="24" height="1.2" rx="0.5" fill="rgba(0,0,0,0.2)" />
    </svg>
  )
}

/* ── Small icon version for lists / compact spaces ── */
export const Car3DSmall = ({ size = 24, ...props }) => (
  <Car3D size={size} {...props} />
)

export const Taxi3DSmall = ({ size = 28, ...props }) => (
  <Taxi3D size={size} {...props} />
)

/* ── Raw SVG groups for inlining into other SVGs (e.g. MapBackground) ── */

const RawShadow = () => (
  <ellipse cx="0" cy="15" rx="14" ry="1.5" fill="#000" opacity="0.12" />
)

export const Car3DG = ({ x = 0, y = 0 }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Shadow */}
    <ellipse cx="18" cy="19" rx="14" ry="1.5" fill="#000" opacity="0.12" />
    {/* Body */}
    <rect x="2" y="4" width="32" height="13" rx="6" fill="url(#carBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
    {/* Roof */}
    <rect x="10" y="1.5" width="16" height="10" rx="4.5" fill="url(#carRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
    {/* Windshield */}
    <rect x="23" y="3" width="7" height="7" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
    {/* Rear window */}
    <rect x="6" y="3" width="5" height="7" rx="2" fill="url(#carWindshield)" opacity="0.7" />
    {/* Front bumper shine */}
    <rect x="26" y="7" width="6" height="6" rx="2" fill="rgba(255,255,255,0.15)" />
    {/* Rear lights */}
    <rect x="2" y="7" width="2.5" height="6" rx="1" fill="#EF4444" opacity="0.9" />
    <rect x="2" y="7" width="2.5" height="6" rx="1" fill="#F87171" opacity="0.4" />
    {/* Front wheels */}
    <circle cx="27" cy="17.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
    <circle cx="27" cy="17.5" r="1.2" fill="#444" />
    {/* Rear wheels */}
    <circle cx="9" cy="17.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
    <circle cx="9" cy="17.5" r="1.2" fill="#444" />
    {/* Headlights */}
    <rect x="32" y="6" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
    <rect x="32" y="13" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
  </g>
)

export const Taxi3DG = ({ x = 0, y = 0 }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Shadow */}
    <ellipse cx="24" cy="21" rx="20" ry="1.5" fill="#000" opacity="0.12" />
    {/* Body */}
    <rect x="2" y="5" width="44" height="14" rx="6.5" fill="url(#taxiBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
    {/* Blue stripe */}
    <rect x="2" y="10" width="44" height="4.5" fill="url(#taxiStripe)" opacity="0.85" />
    {/* Taxi sign */}
    <rect x="18" y="1.5" width="12" height="4" rx="1.5" fill="#FBBF24" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
    <text x="24" y="4.8" textAnchor="middle" fontSize="3" fontWeight="700" fill="#1A1A1A" fontFamily="Inter, sans-serif">4+1</text>
    {/* Roof */}
    <rect x="8" y="2.5" width="32" height="9" rx="4.5" fill="url(#taxiRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
    {/* Windshield */}
    <rect x="35" y="4" width="10" height="6" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
    {/* Side windows */}
    <rect x="14" y="4" width="6" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.75" />
    <rect x="21.5" y="4" width="6" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.75" />
    <rect x="29" y="4" width="4.5" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.7" />
    {/* Rear window */}
    <rect x="4" y="4" width="4" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.6" />
    {/* Front bumper */}
    <rect x="40" y="8" width="5" height="7" rx="2" fill="rgba(255,255,255,0.12)" />
    {/* Rear lights */}
    <rect x="2" y="8" width="2" height="5" rx="1" fill="#EF4444" opacity="0.85" />
    {/* Front wheels */}
    <circle cx="38" cy="19" r="3" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
    <circle cx="38" cy="19" r="1.4" fill="#444" />
    {/* Rear wheels */}
    <circle cx="10" cy="19" r="3" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
    <circle cx="10" cy="19" r="1.4" fill="#444" />
    {/* Headlights */}
    <rect x="44" y="7" width="1.5" height="3.5" rx="0.8" fill="#FDE68A" opacity="0.8" />
    <rect x="44" y="13.5" width="1.5" height="3.5" rx="0.8" fill="#FDE68A" opacity="0.8" />
    {/* TAXI text */}
    <rect x="12" y="15" width="24" height="1.2" rx="0.5" fill="rgba(0,0,0,0.2)" />
  </g>
)
