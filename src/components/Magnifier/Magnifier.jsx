import { useState, useEffect } from 'react'

// Todo: Zoom level may need to be a function of image size
const Magnifier = ({ src, width = '', magnifierWidth = 200, zoomLevel = 2 }) => {
  const [[x, y], setXY] = useState([0, 0]) // cursor position in the image
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <img
        src={src}
        style={{ width, cursor: 'crosshair' }}
        onMouseEnter={(e) => {
          const { width, height } = e.currentTarget.getBoundingClientRect()
          setSize([width, height])
          setShowMagnifier(true)
        }}
        onMouseMove={(e) => {
          // Get coords of top left of image
          const { top, left } = e.currentTarget.getBoundingClientRect()
          // Calculate cursor position in the image
          const x = e.pageX - left - window.scrollX
          const y = e.pageY - top - window.scrollY
          setXY([x, y])
        }}
        onMouseLeave={() => setShowMagnifier(false)}
        alt={'img'}
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          // prevent magnifier blocks the mousemove event of img
          pointerEvents: 'none',
          // set size of magnifier
          width: `${magnifierWidth}px`,
          height: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierWidth / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: '1', // reduce opacity so you can verify position
          border: '1px solid lightgray', // show the border of magnifier
          borderRadius: '50%',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierWidth / 2}px`,
        }}
      />
    </div>
  )
}
export default Magnifier
