import styles from './splash.module.css'
import Icons from '../Icons/Icons'
import { useState } from 'react'

export default function Splash({ startGame }) {
  const [showIntro, setShowIntro] = useState(false)
  return showIntro ? (
    <>
      <h1 className={styles.title}>Greetings, fellow Aramark employee!</h1>
      <p className={styles.introduction}>
        You've just spent most of the day cleaning up after a bachelor party at housekeeping. What a
        relief to be at the meadow!
      </p>
      <p className={styles.introduction}>
        Unfortunately, a group of tourists have just arrived. They want to know where Alex Honnold
        is. You won't be able to relax until they leave.
      </p>
      <p className={styles.directions}>
        Your task is to find our hero Alex and locate each the following features in as little time
        as possible.
      </p>
      <Icons height={'2rem'} />
      <div className={styles.startBtn}>
        <button className={styles.btn} onClick={startGame}>
          Start Game
        </button>
      </div>
    </>
  ) : (
    <>
      {/* <div>
        <img src='./honnold-logo.png' className={styles.logo} alt='Logo' />
      </div> */}
      <h1 className={styles.title}>Where's Alex Honnold?</h1>
      <div className={styles.startBtn}>
        <button className={styles.btn} onClick={() => setShowIntro(true)}>
          Begin
        </button>
      </div>
      <p className={styles.description}>Find our hero on el Cap</p>
    </>
  )
}
