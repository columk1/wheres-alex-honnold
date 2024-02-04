import styles from './Leaderboard.module.css'
const Leaderboard = ({ scores }) => {
  const leaderboard = [
    { name: 'Biggie Smalls', time: '10m 4.224s' },
    { name: 'Alex Honnold', time: '12m 6.628s' },
    { name: 'Little Crimpy', time: '22h 3m 2.34s' },
    { name: 'Wide Pony 69', time: '45m 4.082s' },
    { name: 'French Frees', time: '4m 7.024s' },
  ]

  scores = [...scores, ...leaderboard]

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
