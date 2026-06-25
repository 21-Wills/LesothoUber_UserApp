import React from "react"

/* Image-based 3D vehicle icons
   Place your images in: public/images/vehicles/
     car-sedan.png    - 3D sedan / regular car
     taxi-minibus.png - 3D minibus taxi (4+1)
   Supports PNG, SVG, or WebP. */

const BASE = "/images/vehicles"

const imgStyle = {
  display: "block",
  objectFit: "contain",
}

const shadow = "drop-shadow(0 2px 4px rgba(0,0,0,0.25))"

/* Standalone 3D car */
export const Car3D = ({ size = 36, ...props }) => (
  <img
    src={`${BASE}/car-sedan.png`}
    alt="Car"
    width={size}
    height={size * 0.58}
    style={{ ...imgStyle, filter: shadow }}
    {...props}
  />
)

/* Standalone 3D minibus taxi */
export const Taxi3D = ({ size = 44, ...props }) => (
  <img
    src={`${BASE}/taxi-minibus.png`}
    alt="Taxi"
    width={size}
    height={size * 0.48}
    style={{ ...imgStyle, filter: shadow }}
    {...props}
  />
)

/* Small variants */
export const Car3DSmall = ({ size = 24, ...props }) => (
  <Car3D size={size} {...props} />
)

export const Taxi3DSmall = ({ size = 28, ...props }) => (
  <Taxi3D size={size} {...props} />
)

/* SVG group versions for MapBackground inlining */
export const Car3DG = ({ x = 0, y = 0, size = 36 }) => (
  <g transform={`translate(${x}, ${y})`} filter="url(#carShadow)">
    <image
      href={`${BASE}/car-sedan.png`}
      x={0} y={0}
      width={size}
      height={size * 0.58}
      preserveAspectRatio="xMidYMid meet"
    />
  </g>
)

export const Taxi3DG = ({ x = 0, y = 0, size = 44 }) => (
  <g transform={`translate(${x}, ${y})`} filter="url(#carShadow)">
    <image
      href={`${BASE}/taxi-minibus.png`}
      x={0} y={0}
      width={size}
      height={size * 0.48}
      preserveAspectRatio="xMidYMid meet"
    />
  </g>
)
