import styles from './Game.module.css'
import { useState, useEffect, useRef } from 'react'
import { validateCoords, startTimer, endTimer, saveScore } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'
import Popover from '../Popover/Popover'
import Modal from '../Modal/Modal'
import Leaderboard from '../Leaderboard/Leaderboard'

const data = [
  { name: 'Alex Honnold', overlaySrc: './honnold.png' },
  { name: 'Boot Flake', overlaySrc: './boot-flake.png' },
  { name: 'El Cap Spire', overlaySrc: './el-cap-spire.png' },
  { name: 'The Great Roof', overlaySrc: './great-roof.png' },
  { name: 'The Nipple', overlaySrc: './nipple.png' },
]

const foundMessages = [
  '👨🏻‍🦳 Found it! How do they get the rope up there?',
  '👩🏽 Wow, so high! Have you ever done free climbing?',
  '👵🏻 Impressive! Do they really bring little mattresses up there to sleep on?',
  '👴🏼 Incredible! Is that where those men in the movie got stuck?',
  '🧔🏻‍♂️ Imagine that...',
]

// id used for each game in firebase. // ? Use context provider in refactor
const id = uuidv4()

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}

const Game = ({ src = 'elcap-main.jpg', width = '', magnifierWidth = 100, zoomLevel = 1.5 }) => {
  // Magnifier State
  const [[x, y], setXY] = useState([0, 0]) // cursor position in the image
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  // Drag/Scroll State
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isMouseOut, setIsMouseOut] = useState(false)
  const [wasDragged, setWasDragged] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState(null)
  // Selection State
  const [showPopover, setShowPopover] = useState(false)
  const [popoverCoords, setPopoverCoords] = useState({ x: 0, y: 0 })
  // Game State
  //TODO: Combine state variables into gameState object
  // const [gameState, setGameState] = useState({})
  const [foundItems, setFoundItems] = useState([])
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [name, setName] = useState('')
  const [score, setScore] = useState(null)

  const [loading, setLoading] = useState(true)

  const imageContainer = useRef(null)

  // Toast messages
  const notifyMiss = () => toast.error('🦄 Nope. Not there.', { duration: 3000 })
  const notifyFound = () => toast.success(foundMessages[foundItems.length], { duration: 4000 })

  // Scroll to bottom centre of image when component mounts
  useEffect(() => {
    const container = imageContainer.current
    const img = container.firstChild
    if (!loading) {
      const offsetX = img.clientHeight / 2 - container.clientHeight / 2
      const offsetY = img.clientWidth - container.clientWidth / 2
      container.scrollTo(offsetX, offsetY)
    }
  }, [loading])

  const handleSelection = async (name, coords) => {
    // console.log(coords)
    setShowPopover(false)
    const isValidSelection = await validateCoords(name, coords)
    if (isValidSelection) {
      notifyFound()
      setFoundItems([...foundItems, data.filter((item) => item.name === name)[0]])
      if (data.length - 1 === foundItems.length) {
        const score = await endTimer(id)
        setScore(score)
        setIsGameOver(true)
      }
    } else {
      notifyMiss()
    }
  }

  const restartGame = () => {
    setFoundItems([])
    setIsGameStarted(false)
    setIsGameOver(false)
  }

  console.log(showMagnifier)

  // Render leaderboard if the game has ended
  return isGameOver && !isGameStarted ? (
    <>
      <Leaderboard />
      <button onClick={restartGame}>Play Again</button>
    </>
  ) : (
    // Main render block
    <>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: '#333',
            color: 'white',
          },
        }}
      />

      {/* Start Game Modal */}

      {!isGameStarted && (
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
      )}

      {/* Game Over Modal */}

      {isGameOver && (
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
            maxLength={25}
            onChange={(e) => setName(e.target.value)}
          />
        </Modal>
      )}

      {/* Image Container */}

      <div
        className={styles.imgContainer}
        ref={imageContainer}
        // style={{
        //   position: 'relative',
        //   width: '90vw',
        //   overflow: 'hidden',
        // }}
      >
        {/* Draggable Image */}

        <img
          src={src}
          style={{ width, cursor: 'crosshair' }}
          onLoad={() => setLoading(false)}
          onMouseEnter={(e) => {
            const { width, height } = e.currentTarget.getBoundingClientRect()
            setSize([width, height])
            if (!showPopover && !isTouchDevice()) setShowMagnifier(true)
          }}
          onPointerDown={(e) => {
            if (isTouchDevice()) return
            setIsMouseDown(true)
            setIsMouseOut(false)
            setWasDragged(false)
            // dragStart.x = imageContainer.current.scrollLeft + e.clientX
            // dragStart.y = imageContainer.current.scrollTop + e.clientY
            setDragStart({
              x: imageContainer.current.scrollLeft + (e.clientX || e.targetTouches[0].clientX),
              y: imageContainer.current.scrollTop + (e.clientY || e.targetTouches[0].clientY),
            })
            if (e.touches) {
              setTouchStart(e.touches[0])
            }
          }}
          onTouchStart={(e) => {
            setShowPopover(false)
            setIsMouseDown(true)
            setIsMouseOut(false)
            setWasDragged(false)
            // dragStart.x = imageContainer.current.scrollLeft + e.clientX
            // dragStart.y = imageContainer.current.scrollTop + e.clientY
            setDragStart({
              x: imageContainer.current.scrollLeft + e.targetTouches[0].clientX,
              y: imageContainer.current.scrollTop + e.targetTouches[0].clientY,
            })
            setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
          }}
          onMouseUp={() => {
            setIsMouseDown(false)
          }}
          onTouchEnd={(e) => {
            setIsMouseDown(false)

            // If mouseMove or touchMove was not triggered, fire the click event
            if (!wasDragged) {
              const { top, left } = e.currentTarget.getBoundingClientRect()
              setPopoverCoords({
                x: e.changedTouches[0].pageX - left - window.scrollX,
                y: e.changedTouches[0].pageY - top - window.scrollY,
                isUpperHalf: e.pageY < window.innerHeight / 2,
              })
              setShowPopover(!showPopover)
              // setShowMagnifier(!showMagnifier)
            }
          }}
          onMouseMove={(e) => {
            if (isTouchDevice()) return
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
            const x = e.pageX - left - window.scrollX
            const y = e.pageY - top - window.scrollY
            setXY([x, y])
          }}
          onTouchMove={(e) => {
            if (isMouseDown && !isMouseOut) {
              imageContainer.current.scrollTo(
                dragStart.x - e.targetTouches[0].pageX,
                dragStart.y - e.targetTouches[0].pageY
              )
              // Calculate the distance between touchStart and touchEnd position
              const touchEnd = e.changedTouches[0]
              const dx = Math.pow(touchStart.x - touchEnd.pageX, 2)
              const dy = Math.pow(touchStart.y - touchEnd.pageY, 2)

              const distance = Math.round(Math.sqrt(dx + dy))
              // console.log('distance: ', distance)
              if (distance > 10) {
                setWasDragged(true)
              }
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
            if (wasDragged || isTouchDevice()) return
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

        {/* Popover Select Menu */}

        {showPopover && (
          <Popover
            location={popoverCoords}
            list={data
              .map((item) => item.name)
              .filter((item) => !foundItems.some((foundItem) => foundItem.name === item))}
            handleSelection={handleSelection}
          />
        )}

        {/* Overlay */}

        {foundItems.map((item) => (
          <img
            key={item.name}
            className={styles.overlay}
            src={item.overlaySrc}
            alt={item.name}
            draggable={false}
          />
        ))}

        {/* Magnifier */}

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
export default Game
