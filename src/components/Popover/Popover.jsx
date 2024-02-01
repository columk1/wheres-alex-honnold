import styles from './Popover.module.css'
import { useState } from 'react'

const Popover = ({ location, list, handleSelection }) => {
  console.log('coords: ', location)
  const { x, y, isUpperHalf } = location
  // Different style depending on if click was in upper half of window
  const popoverStyle = isUpperHalf
    ? { top: y, left: x, transform: 'translateX(-50%) translateY(20%)' }
    : { top: y, left: x }

  const arrowStyle = isUpperHalf
    ? { top: '-10px', transform: 'translateX(-50%)rotate(180deg)' }
    : {}
  return (
    <>
      <div className={styles.popover} style={popoverStyle}>
        <p className={styles.title}>Items</p>
        <div className={styles.list}>
          {list.map((item) => (
            <button key={item} onClick={() => handleSelection(item, { x, y })}>
              {item}
            </button>
          ))}
        </div>
        <div className={styles.arrow} style={arrowStyle} />
      </div>

      <div className={styles.target} style={{ top: y, left: x }} />
    </>
  )
}

export default Popover
