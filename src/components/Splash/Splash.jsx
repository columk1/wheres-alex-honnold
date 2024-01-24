import styles from './splash.module.css'

export default function Splash({ startGame }) {
  return (
    <>
      <div>
        <img className={styles.logo} alt='Logo' />
      </div>
      <h1>Where's Alex Honnold?</h1>

      <div className={styles.startBtn}>
        <button className={styles.btn} onClick={startGame}>
          Start Game
        </button>
      </div>
      <p className={styles.description}>A React project assignment from The Odin Project</p>
    </>
  )
}
