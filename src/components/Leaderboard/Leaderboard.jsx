import styles from './Leaderboard.module.css'
import { useState, useEffect } from 'react'
import { getScores } from '../../firebase'
const Leaderboard = ({ currentScore }) => {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const getLeaderboard = async () => {
      const scores = await getScores()
      setLeaderboard(scores)
    }
    getLeaderboard()
  }, [])

  // scores = [...scores, ...leaderboard]
  // let scores = [currentScore, ...leaderboard]
  let scores = [...leaderboard]

  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((score, i) => (
          <li className={styles.listItem} key={score.name}>
            <p>{i + 1}</p>
            <p className={styles.name}>{score.name}</p>
            <p className={styles.time}>{score.time}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard
