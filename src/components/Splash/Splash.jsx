import styles from './splash.module.css'

export default function Splash({ startGame }) {
  return (
    <>
      <div>
        <img className={styles.logo} alt='Logo' />
      </div>
      <h1>Where's Alex Honnold?</h1>
      <p>
        Your task is to find Alex Honnold and some of his favourite El Cap features in as little
        time as possible.
      </p>

      <div className={styles.startBtn}>
        <button className={styles.btn} onClick={startGame}>
          Start Game
        </button>
      </div>
      <p className={styles.description}>Find our hero on el Cap</p>
    </>
  )
}
