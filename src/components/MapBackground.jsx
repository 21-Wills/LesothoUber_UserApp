const MapBackground = ({ state = 'idle' }) => {
  const isMatched = state === 'matched'
  const isFinding = state === 'finding'

  return (
    <div className="map-bg">
      <svg
        className="map-svg"
        viewBox="0 0 390 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1D1D8" strokeWidth="0.8" />
          </pattern>
          <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#smallGrid)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#C8C8D0" strokeWidth="1.5" />
          </pattern>

          {/* Ambient glows */}
          <radialGradient id="blueGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#F5F5F7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="greenGlowBg" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#16A34A" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#F5F5F7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tealGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#F5F5F7" stopOpacity="0" />
          </radialGradient>

          {/* 3D Vehicle gradients */}
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
          <radialGradient id="wheelGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="60%" stopColor="#333" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
          <filter id="carShadow" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Base */}
        <rect width="390" height="700" fill="#F5F5F7" />
        <rect width="390" height="700" fill="url(#grid)" />

        {/* Ambient glow based on state */}
        <rect
          width="390"
          height="700"
          fill={
            isMatched
              ? 'url(#greenGlowBg)'
              : isFinding
              ? 'url(#tealGlow)'
              : 'url(#blueGlow)'
          }
        />

        {/* ── Road network ── */}
        {/* Horizontal main roads */}
        <rect x="0"   y="136" width="390" height="14" fill="#E2E2E8" rx="0" />
        <rect x="0"   y="270" width="390" height="20" fill="#DCDCE3" rx="0" />
        <rect x="0"   y="420" width="250" height="10" fill="#E5E5EB" rx="0" />

        {/* Vertical main roads */}
        <rect x="88"  y="0"   width="10"  height="700" fill="#E5E5EB" rx="0" />
        <rect x="195" y="0"   width="18"  height="700" fill="#DCDCE3" rx="0" />
        <rect x="310" y="0"   width="10"  height="500" fill="#E5E5EB" rx="0" />

        {/* Minor roads */}
        <rect x="0"   y="200" width="390" height="6"  fill="#EAEAF0" rx="0" />
        <rect x="0"   y="360" width="390" height="6"  fill="#EAEAF0" rx="0" />
        <rect x="148" y="0"   width="6"   height="700" fill="#EAEAF0" rx="0" />
        <rect x="258" y="0"   width="6"   height="700" fill="#EAEAF0" rx="0" />

        {/* Diagonal road */}
        <line x1="0" y1="320" x2="160" y2="500" stroke="#E2E2E8" strokeWidth="10" />

        {/* City blocks */}
        <rect x="100" y="148" width="88"  height="106" fill="#ECECF2" rx="2" />
        <rect x="214" y="148" width="88"  height="106" fill="#EBEBF1" rx="2" />
        <rect x="10"  y="148" width="70"  height="106" fill="#ECECF2" rx="2" />
        <rect x="320" y="148" width="62"  height="106" fill="#F0F0F5" rx="2" />

        <rect x="100" y="282" width="88"  height="70"  fill="#ECECF2" rx="2" />
        <rect x="214" y="282" width="88"  height="70"  fill="#EBEBF1" rx="2" />
        <rect x="10"  y="282" width="70"  height="70"  fill="#F0F0F5" rx="2" />
        <rect x="320" y="282" width="62"  height="70"  fill="#ECECF2" rx="2" />

        <rect x="100" y="370" width="88"  height="40"  fill="#F0F0F5" rx="2" />
        <rect x="214" y="370" width="88"  height="40"  fill="#ECECF2" rx="2" />

        {/* Road center dashes */}
        <line x1="0" y1="143" x2="390" y2="143" stroke="#D8D8DF" strokeWidth="1"
          strokeDasharray="20 12" />
        <line x1="204" y1="0" x2="204" y2="700" stroke="#D8D8DF" strokeWidth="1"
          strokeDasharray="20 12" />

        {/* ── Current location pin ── */}
        {/* Outer pulse ring */}
        <circle cx="204" cy="280" r="22" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r"       values="18;32;18"  dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {/* Inner pulse */}
        <circle cx="204" cy="280" r="12" fill="#3B82F6" opacity="0.15">
          <animate attributeName="r"       values="10;16;10"  dur="2.4s" repeatCount="indefinite" begin="0.3s" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        {/* White accuracy ring */}
        <circle cx="204" cy="280" r="8" fill="white" opacity="0.9" />
        <circle cx="204" cy="280" r="5" fill="#3B82F6" />

        {/* ── Destination pin (shown when matched) ── */}
        {isMatched && (
          <>
            {/* Route line */}
            <path
              d="M 204 280 Q 260 200 310 148"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="500"
              strokeDashoffset="0"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="500"
                to="0"
                dur="1.2s"
                fill="freeze"
              />
            </path>
            {/* Destination marker */}
            <circle cx="310" cy="148" r="8" fill="#22C55E" opacity="0.9" />
            <circle cx="310" cy="148" r="4" fill="white" />
          </>
        )}

        {/* ── Nearby vehicle icons (visible during finding) ── */}
        {isFinding && (
          <>
            {/* Car 1 – sedan */}
            <g opacity="0.75">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-30,10; 10,-20; 25,15; -30,10"
                dur="4.2s"
                repeatCount="indefinite"
              />
              {/* Shadow */}
              <ellipse cx="148" cy="163" rx="14" ry="1.5" fill="#000" opacity="0.1" />
              {/* Body */}
              <rect x="132" y="148" width="32" height="13" rx="6" fill="url(#carBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
              {/* Roof */}
              <rect x="140" y="145.5" width="16" height="10" rx="4.5" fill="url(#carRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              {/* Windshield */}
              <rect x="153" y="147" width="7" height="7" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
              {/* Rear window */}
              <rect x="136" y="147" width="5" height="7" rx="2" fill="url(#carWindshield)" opacity="0.7" />
              {/* Wheels */}
              <circle cx="157" cy="161.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
              <circle cx="157" cy="161.5" r="1.2" fill="#444" />
              <circle cx="139" cy="161.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
              <circle cx="139" cy="161.5" r="1.2" fill="#444" />
              {/* Rear lights */}
              <rect x="132" y="151" width="2" height="5" rx="1" fill="#EF4444" opacity="0.85" />
              {/* Headlights */}
              <rect x="162" y="150" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
              <rect x="162" y="155" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
            </g>
            {/* Taxi 2 – minibus 4+1 */}
            <g opacity="0.72">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="20,-15; -15,20; -20,-10; 20,-15"
                dur="5.8s"
                repeatCount="indefinite"
              />
              {/* Shadow */}
              <ellipse cx="274" cy="327" rx="18" ry="1.5" fill="#000" opacity="0.1" />
              {/* Body */}
              <rect x="252" y="311" width="44" height="14" rx="6.5" fill="url(#taxiBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
              {/* Blue stripe */}
              <rect x="252" y="316" width="44" height="4.5" fill="url(#taxiStripe)" opacity="0.85" />
              {/* Taxi sign */}
              <rect x="268" y="307.5" width="12" height="4" rx="1.5" fill="#FBBF24" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
              <text x="274" y="310.8" textAnchor="middle" fontSize="3" fontWeight="700" fill="#1A1A1A" fontFamily="Inter, sans-serif">4+1</text>
              {/* Roof */}
              <rect x="258" y="308.5" width="32" height="9" rx="4.5" fill="url(#taxiRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              {/* Windshield + side windows */}
              <rect x="285" y="310" width="8" height="6" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
              <rect x="264" y="310" width="6" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.75" />
              <rect x="271.5" y="310" width="6" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.75" />
              <rect x="279" y="310" width="4.5" height="6" rx="1.5" fill="url(#carWindshield)" opacity="0.7" />
              {/* Wheels */}
              <circle cx="288" cy="325" r="3" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
              <circle cx="288" cy="325" r="1.4" fill="#444" />
              <circle cx="260" cy="325" r="3" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
              <circle cx="260" cy="325" r="1.4" fill="#444" />
              {/* Rear lights */}
              <rect x="252" y="314" width="2" height="5" rx="1" fill="#EF4444" opacity="0.85" />
              {/* Headlights */}
              <rect x="294" y="313" width="1.5" height="3.5" rx="0.8" fill="#FDE68A" opacity="0.8" />
              <rect x="294" y="319.5" width="1.5" height="3.5" rx="0.8" fill="#FDE68A" opacity="0.8" />
            </g>
            {/* Car 3 – sedan */}
            <g opacity="0.6">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="5,30; -25,-5; 20,-25; 5,30"
                dur="4.7s"
                repeatCount="indefinite"
              />
              {/* Shadow */}
              <ellipse cx="78" cy="377" rx="14" ry="1.5" fill="#000" opacity="0.1" />
              {/* Body */}
              <rect x="62" y="362" width="32" height="13" rx="6" fill="url(#carBody)" filter="url(#carShadow)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
              {/* Roof */}
              <rect x="70" y="359.5" width="16" height="10" rx="4.5" fill="url(#carRoof)" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              {/* Windshield */}
              <rect x="83" y="361" width="7" height="7" rx="2.5" fill="url(#carWindshield)" opacity="0.85" />
              {/* Rear window */}
              <rect x="66" y="361" width="5" height="7" rx="2" fill="url(#carWindshield)" opacity="0.7" />
              {/* Wheels */}
              <circle cx="87" cy="375.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
              <circle cx="87" cy="375.5" r="1.2" fill="#444" />
              <circle cx="69" cy="375.5" r="2.8" fill="url(#wheelGrad)" stroke="#222" strokeWidth="0.5" />
              <circle cx="69" cy="375.5" r="1.2" fill="#444" />
              {/* Rear lights */}
              <rect x="62" y="365" width="2" height="5" rx="1" fill="#EF4444" opacity="0.85" />
              {/* Headlights */}
              <rect x="92" y="364" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
              <rect x="92" y="369" width="1.5" height="4" rx="0.8" fill="#FDE68A" opacity="0.8" />
            </g>
          </>
        )}
      </svg>

      <div className="map-overlay" />
    </div>
  )
}

export default MapBackground
