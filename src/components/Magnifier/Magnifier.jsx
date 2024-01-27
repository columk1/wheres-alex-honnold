import styles from './Magnifier.module.css'
import { useState, useEffect, useRef } from 'react'

// Todo: Zoom level may need to be a function of image size
const Magnifier = ({ src, width = '', magnifierWidth = 200, zoomLevel = 2 }) => {
  const [[x, y], setXY] = useState([0, 0]) // cursor position in the image
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isMouseOut, setIsMouseOut] = useState(false)
  const [wasDragged, setWasDragged] = useState(false)
  const imageContainer = useRef(null)

  // let isMouseDown = false
  // let isMouseOut = false
  // let wasDragged = false

  // const [dragStart, setDragStart] = { x: 0, y: 0 }
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = imageContainer.current
    const img = container.firstChild
    if (container && img) {
      const offsetX = img.clientHeight / 2 - container.clientHeight / 2
      const offsetY = img.clientWidth - container.clientWidth / 2
      container.scrollTo(offsetX, offsetY)
    }
  }, [])

  return (
    <div
      className={styles.imgContainer}
      ref={imageContainer}
      style={{
        position: 'relative',
        maxWidth: '90vw',
        overflow: 'hidden',
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
        onMouseDown={(e) => {
          setIsMouseDown(true)
          setIsMouseOut(false)
          setWasDragged(false)
          // dragStart.x = imageContainer.current.scrollLeft + e.clientX
          // dragStart.y = imageContainer.current.scrollTop + e.clientY
          setDragStart({
            x: imageContainer.current.scrollLeft + e.clientX,
            y: imageContainer.current.scrollTop + e.clientY,
          })
          // setDragStart({ x: x, y: y })
        }}
        onMouseUp={() => {
          setIsMouseDown(false)
        }}
        onMouseMove={(e) => {
          if (isMouseDown && !isMouseOut) {
            imageContainer.current.scrollTo(dragStart.x - e.clientX, dragStart.y - e.clientY)
            setWasDragged(true)
          }
          // Get coords of top left of image
          const { top, left } = e.currentTarget.getBoundingClientRect()
          // Calculate cursor position in the image
          const x = e.pageX - left - window.scrollX
          const y = e.pageY - top - window.scrollY
          setXY([x, y])
        }}
        onMouseLeave={() => {
          setShowMagnifier(false)
          setIsMouseOut(true)
          setIsMouseDown(false)
        }}
        alt={'img'}
        draggable={false}
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
