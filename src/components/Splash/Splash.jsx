import styles from './Splash.module.css'
import Icons from '../Icons/Icons'
import { useState } from 'react'
import Leaderboard from '../Leaderboard/Leaderboard'

export default function Splash({ startGame }) {
  const [showIntro, setShowIntro] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  return showIntro ? (
    <div className={styles.container}>
      <h1 className={styles.title}>Greetings, fellow Aramark employee!</h1>
      <p className={styles.introduction}>
        You've spent most of the day cleaning up after a bachelor party at housekeeping. What a
        relief to be back at the meadow!
      </p>
      <p className={styles.introduction}>
        Unfortunately, a group of tourists are approaching. Guess what? They want you to point out
        where Alex Honnold is, among other things. You won't be able to relax until they leave...
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
    </div>
  ) : showLeaderboard ? (
    <>
      <Leaderboard />
      <button onClick={() => setShowLeaderboard(false)}>Back</button>
    </>
  ) : (
    <div className={styles.container}>
      {/* <div>
        <img src='./honnold-logo.png' className={styles.logo} alt='Logo' />
      </div> */}
      <h1 className={styles.title}>Where's Alex Honnold?</h1>
      <p className={styles.description}>Find our hero on el Cap</p>
      <div className={styles.menuBtns}>
        <button className={styles.btn} onClick={() => setShowIntro(true)}>
          Start
        </button>
        <button className={styles.btn} onClick={() => setShowLeaderboard(true)}>
          View Leaderboard
        </button>
      </div>
    </div>
  )
}
