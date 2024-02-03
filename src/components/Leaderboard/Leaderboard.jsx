import styles from './Leaderboard.module.css'
const Leaderboard = ({ scores }) => {
  console.log(scores)
  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((score, i) => (
          <li key={score.name}>
            <p>{i + 1}</p>
            <p>{score.name}</p>
            <p>{score.time}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Leaderboard
