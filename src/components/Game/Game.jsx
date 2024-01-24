import styles from './Game.module.css'
import { useRef, useEffect, useState } from 'react'
import useMousePosition from '../../hooks/useMousePosition.js'

const Game = () => {
  const [size, setSize] = useState()
  const imgRef = useRef(null)

  const { x, y } = useMousePosition()

  function handleMouseMove(event) {}

  useEffect(() => {
    const getSize = () => {
      let width = imgRef.current.offsetWidth * 2
      let height = imgRef.current.offsetHeight * 2
      return `${width}px ${height}px`
    }
    setSize(getSize())
  }, [imgRef])

  return (
    <>
      <div className={styles.imgContainer}></div>
      <ZoomOverlay size={size} />
      <img ref={imgRef} src='elcap.jpg' onMouseMove={handleMouseMove}></img>
    </>
  )
}

const ZoomOverlay = (size, handleMouseMove) => {
  return (
    <div
      onMouseMove={handleMouseMove}
      className={styles.zoomOverlay}
      style={{ backgroundSize: size }}
    ></div>
  )
}

export default Game
