import styles from './Magnifier.module.css'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { validateCoords, startTimer, endTimer, saveScore } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import Popover from '../Popover/Popover'
import Modal from '../Modal/Modal'
import Leaderboard from '../Leaderboard/Leaderboard'

const data = [
  // { name: 'Alex Honnold', overlaySrc: './honnold.png' },
  // { name: 'Boot Flake', overlaySrc: './boot-flake.png' },
  { name: 'El Cap Spire', overlaySrc: './el-cap-spire.png' },
  { name: 'The Great Roof', overlaySrc: './great-roof.png' },
  // { name: 'The Nipple', overlaySrc: './nipple.png' },
]

// id used for each game in firebase. // ? Use context provider in refactor
const id = uuidv4()

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
  const [isGameOver, setIsGameOver] = useState(false)
  // const [gameState, setGameState] = useState('')
  const [name, setName] = useState('')
  const [score, setScore] = useState(null)
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

  const handleSelection = async (name, coords) => {
    setShowPopover(false)
    const isValidSelection = await validateCoords(name, coords)
    if (isValidSelection) {
      // console.log('found item: ', name)
      setFoundItems([...foundItems, data.filter((item) => item.name === name)[0]])
      if (data.length - 1 === foundItems.length) {
        // endTimer(id)
        const score = await endTimer(id)
        setScore(score)
        setIsGameOver(true)
      }
    } else {
      // TODO: Add toast message
      console.log('Nope, try again')
    }
  }

  const restartGame = () => {
    setFoundItems([])
    setIsGameStarted(false)
    setIsGameOver(false)
  }

  return isGameOver && !isGameStarted ? (
    <>
      <Leaderboard />
      <button onClick={restartGame}>Play Again</button>
    </>
  ) : (
    <>
      <Modal
        openModal={!isGameStarted}
        closeModal={() => {
          startTimer(id)
          setIsGameStarted(true)
        }}
        buttonText='OK!'
      >
        <p>
          Move the image by clicking and dragging. When you've found one of the features, click on
          it. Good luck!
        </p>
      </Modal>
      <Modal
        openModal={isGameOver}
        closeModal={() => {
          setIsGameStarted(false)
          saveScore(id, name)
        }}
        buttonText='Continue'
      >
        <h2>You did it!</h2>
        <p>
          The tourists are leaving. It only took you{' '}
          <span style={{ fontSize: '1.5rem' }}>{score}</span>.
        </p>
        <label htmlFor='name'>Enter your name below to see your score on the leaderboard.</label>
        <input
          type='text'
          name='name'
          placeholder='Sender McGee'
          value={name}
          maxLength={30}
          onChange={(e) => setName(e.target.value)}
        />
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
              x: imageContainer.current.scrollLeft + (e.clientX || e.targetTouches[0].clientX),
              y: imageContainer.current.scrollTop + (e.clientY || e.targetTouches[0].clientY),
            })
            // setDragStart({ x: x, y: y })
          }}
          onPointerUp={() => {
            setIsMouseDown(false)
          }}
          onPointerMove={(e) => {
            if (isMouseDown && !isMouseOut) {
              imageContainer.current.scrollTo(
                dragStart.x - (e.clientX || e.targetTouches[0].pageX),
                dragStart.y - (e.clientY || e.targetTouches[0].pageY)
              )
              setWasDragged(true)
            }
            // Get coords of top left of image
            const { top, left } = e.currentTarget.getBoundingClientRect()
            // Calculate cursor position in the image
            const x = (e.pageX || e.target.touches[0].pageX) - left - window.scrollX
            const y = (e.pageY || e.target.touches[0].pageY) - top - window.scrollY
            setXY([x, y])
          }}
          onTouchMove={(e) => {
            if (isMouseDown && !isMouseOut) {
              imageContainer.current.scrollTo(
                dragStart.x - (e.clientX || e.targetTouches[0].pageX),
                dragStart.y - (e.clientY || e.targetTouches[0].pageY)
              )
              setWasDragged(true)
            }
            // Get coords of top left of image
            const { top, left } = e.currentTarget.getBoundingClientRect()
            // Calculate cursor position in the image
            const x = (e.pageX || e.targetTouches[0].pageX) - left - window.scrollX
            const y = (e.pageY || e.targetTouches[0].pageY) - top - window.scrollY
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
    </>
  )
}
export default Magnifier
