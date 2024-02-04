import styles from './Magnifier.module.css'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Popover from '../Popover/Popover'
import Modal from '../Modal/Modal'
import Leaderboard from '../Leaderboard/Leaderboard'

const data = [
  // { name: 'Alex Honnold', overlaySrc: './honnold.png', x: 508, y: 551.2 },
  // { name: 'Boot Flake', overlaySrc: './boot-flake.png', x: 843.5, y: 472.6 },
  // { name: 'El Cap Spire', overlaySrc: './el-cap-spire.png', x: 519, y: 500 },
  // { name: 'The Great Roof', overlaySrc: './great-roof.png', x: 811, y: 353 },
  { name: 'The Nipple', overlaySrc: './nipple.png', x: 1653, y: 608.6 },
]

// Todo: Zoom level may need to be a function of image size
const Magnifier = ({ src, width = '', magnifierWidth = 100, zoomLevel = 1.5 }) => {
  const [[x, y], setXY] = useState([0, 0]) // cursor position in the image
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isMouseOut, setIsMouseOut] = useState(false)
  const [wasDragged, setWasDragged] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [popoverCoords, setPopoverCoords] = useState({ x: 0, y: 0 })
  const [foundItems, setFoundItems] = useState([])
  const [isGameStarted, setIsGameStarted] = useState(false)
  // const [gameState, setGameState] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const imageContainer = useRef(null)

  // let isMouseDown = false
  // let isMouseOut = false
  // let wasDragged = false

  // const [dragStart, setDragStart] = { x: 0, y: 0 }
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useLayoutEffect(() => {
    const container = imageContainer.current
    const img = container.firstChild
    if (!loading) {
      const offsetX = img.clientHeight / 2 - container.clientHeight / 2
      const offsetY = img.clientWidth - container.clientWidth / 2
      container.scrollTo(offsetX, offsetY)
    }
  }, [loading])

  const handleSelection = (name, coords) => {
    setShowPopover(false)
    console.log('handleSelection')
    data.forEach((item) => {
      console.log(name)
      console.log(item.name)
      if (item.name === name) {
        console.log('item: ', item.name)
        if (
          coords.x > item.x - 20 &&
          coords.x < item.x + 20 &&
          coords.y > item.y - 20 &&
          coords.y < item.y + 20
        ) {
          console.log('found item: ', item.name)
          setFoundItems([...foundItems, item])
        }
      }
    })
  }

  const endGame = () => data.length === foundItems.length

  return endGame() && !isGameStarted ? (
    <>
      <Leaderboard scores={[{ name: name, time: '2m 23s' }]} />
    </>
  ) : (
    <>
      <Modal openModal={!isGameStarted} closeModal={() => setIsGameStarted(true)} buttonText='OK!'>
        <p>
          Move the image by clicking and dragging. When you've found one of the features, click on
          it. Good luck!
        </p>
      </Modal>
      <div
        className={styles.imgContainer}
        ref={imageContainer}
        style={{
          position: 'relative',
          width: '90vw',
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          style={{ width, cursor: 'crosshair' }}
          onLoad={() => setLoading(false)}
          onMouseEnter={(e) => {
            const { width, height } = e.currentTarget.getBoundingClientRect()
            setSize([width, height])
            if (!showPopover) setShowMagnifier(true)
          }}
          onPointerDown={(e) => {
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
          onPointerUp={() => {
            setIsMouseDown(false)
          }}
          onPointerMove={(e) => {
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
          onClick={(e) => {
            if (wasDragged) return
            const { top, left } = e.currentTarget.getBoundingClientRect()
            setPopoverCoords({
              x: e.pageX - left - window.scrollX,
              y: e.pageY - top - window.scrollY,
              isUpperHalf: e.pageY < window.innerHeight / 2,
            })
            setShowPopover(!showPopover)
            setShowMagnifier(!showMagnifier)
          }}
          alt={'img'}
          draggable={false}
        />
        {showPopover && (
          <Popover
            location={popoverCoords}
            list={[
              'Alex Honnold',
              'Boot Flake',
              'El Cap Spire',
              'The Great Roof',
              'The Nipple',
            ].filter((item) => !foundItems.some((foundItem) => foundItem.name === item))}
            handleSelection={handleSelection}
          />
        )}

        {foundItems.map((item) => (
          <img
            key={item.name}
            className={styles.overlay}
            src={item.overlaySrc}
            alt={item.name}
            draggable={false}
          />
        ))}

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
      <Modal
        openModal={endGame()}
        closeModal={() => setIsGameStarted(false)}
        buttonText='Save score'
      >
        <h2>You did it!</h2>
        <p>The tourists are leaving. It only took you {} minutes.</p>
        <label htmlFor='name'>Enter your name below to see your score on the leaderboard</label>
        <input
          type='text'
          name='name'
          placeholder='Sender McGee'
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </>
  )
}
export default Magnifier
