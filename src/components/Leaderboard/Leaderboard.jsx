import styles from './Leaderboard.module.css'
import { useState, useEffect } from 'react'
import { getScores } from '../../firebase'
import Spinner from '../Spinner/Spinner'
const Leaderboard = ({ currentScore }) => {
  const [scores, setScores] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    const getLeaderboard = async () => {
      const highScores = await getScores()
      setScores(highScores)
    }
    getLeaderboard()
    if (scores) setLoading(false)
  }, [scores])

  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {scores.map((score, i) => (
            <li className={styles.listItem} key={score.name}>
              <p className={styles.position}>{i + 1}</p>
              <p className={styles.name}>{score.name}</p>
              <p className={styles.time}>{score.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Leaderboard
