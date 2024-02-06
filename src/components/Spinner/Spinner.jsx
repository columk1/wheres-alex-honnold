import styles from './Spinner.module.css'
import HonnoldIcon from '/honnold-logo.png'

const Spinner = () => {
  return (
    <div role='status' className={styles.spinner}>
      <img src={HonnoldIcon} alt='Honnold' className={styles.icon}></img>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Spinner
