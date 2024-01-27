import styles from './Game.module.css'
import { useRef, useEffect, useState } from 'react'
import useMousePosition from '../../hooks/useMousePosition.js'
import Magnifier from '../Magnifier/Magnifier'

const Game = () => {
  // const [size, setSize] = useState({ width: 0, height: 0 })
  // const imgRef = useRef(null)

  // useEffect(() => {
  //   const getSize = () => {
  //     let width = imgRef.current.offsetWidth * 2
  //     let height = imgRef.current.offsetHeight * 2
  //     return { width, height }
  //   }
  //   setSize(getSize())
  // }, [imgRef])

  // const { width, height } = size
  return (
    <>
      <Magnifier src='elcap.jpg' />
      {/* <img ref={imgRef} src='elcap.jpg' onMouseMove={handleMouseMove}></img> */}
    </>
  )
}

export default Game
