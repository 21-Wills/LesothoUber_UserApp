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
            <g opacity="0.82">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-30,10; 10,-20; 25,15; -30,10"
                dur="4.2s"
                repeatCount="indefinite"
              />
              <image href="/images/vehicles/car-sedan.png" x="132" y="148" width="36" height="21" />
            </g>
            {/* Taxi 2 – minibus 4+1 */}
            <g opacity="0.78">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="20,-15; -15,20; -20,-10; 20,-15"
                dur="5.8s"
                repeatCount="indefinite"
              />
              <image href="/images/vehicles/taxi-minibus.svg" x="250" y="308" width="48" height="23" />
            </g>
            {/* Car 3 – sedan */}
            <g opacity="0.65">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="5,30; -25,-5; 20,-25; 5,30"
                dur="4.7s"
                repeatCount="indefinite"
              />
              <image href="/images/vehicles/car-sedan.png" x="62" y="360" width="36" height="21" />
            </g>
          </>
        )}
      </svg>

      <div className="map-overlay" />
    </div>
  )
}

export default MapBackground
