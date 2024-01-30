import styles from './Popover.module.css'
import { useState } from 'react'

const Popover = ({ coords, list, handleSelection }) => {
  console.log('coords: ', coords)
  return (
    <>
      <div className={styles.popover} style={{ top: coords.y, left: coords.x }}>
        <p className={styles.title}>Items</p>
        <div className={styles.list}>
          {list.map((item) => (
            <button key={item} onClick={() => handleSelection(item, coords)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.target} style={{ top: coords.y, left: coords.x }} />
    </>
  )
}

export default Popover