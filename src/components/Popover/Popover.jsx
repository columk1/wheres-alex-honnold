import styles from './Popover.module.css'
import { useState } from 'react'

const Popover = ({ location, list, handleSelection }) => {
  // console.log('coords: ', location)
  const { x, y, isUpperHalf } = location

  return (
    <>
      <div
        // Different style depending on if click was in the upper half of window
        className={isUpperHalf ? styles.popoverUpper : styles.popover}
        style={{ top: y, left: x }}
      >
        <p className={styles.title}>Items</p>
        <div className={styles.list}>
          {list.map((item) => (
            <button key={item} onClick={() => handleSelection(item, { x, y })}>
              {item}
            </button>
          ))}
        </div>
        {/* <div className={styles.arrow} style={arrowStyle} /> */}
      </div>
      <div className={styles.target} style={{ top: y, left: x }} />
    </>
  )
}

export default Popover
