import styles from './Icons.module.css'
const Icons = ({ height }) => {
  return (
    <div className={styles.icons}>
      <div className={styles.iconGroup}>
        <svg
          id='boot-flake'
          data-name='Boot Flake'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 40.8 71.47'
          height={height}
        >
          <defs>
            <style>{`
      .icon {
        fill: #fff;
        stroke-width: 0px;
      }
    `}</style>
          </defs>
          <g id='boot-flake-g' data-name='Boot Flake'>
            <path
              className='icon'
              d='m0,55.68v-10.08c0-.99.8-1.79,1.79-1.79h7.03c.99,0,1.79-.8,1.79-1.79V5.25c0-.72.43-1.37,1.09-1.65L19.89.14c.38-.16.8-.19,1.19-.07l14.56,4.16c.48.14.89.47,1.11.92l3.87,7.75c.21.41.25.89.11,1.34l-11.07,35.44c-.05.17-.08.35-.08.53v19.47c0,1.36-1.45,2.22-2.64,1.58L.94,57.26c-.58-.31-.94-.92-.94-1.58Z'
            />
          </g>
        </svg>
        <p className={styles.iconTitle}>Boot Flake</p>
      </div>

      <div className={styles.iconGroup}>
        <svg
          id='el-cap-spire'
          data-name='El Cap Spire'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 80 137.04'
          height={height}
        >
          <defs>
            <style>{`
        .icon {
          fill: #fff;
          stroke-width: 0px;
        }
        `}</style>
          </defs>
          <g id='el-cap-spire-g' data-name='El Cap Spire 2'>
            <path
              className='icon'
              d='m.11,132.14L28.74,13.21c.3-1.23,1.16-2.25,2.33-2.74L55.49.31c1.07-.44,2.27-.4,3.3.11l19.01,9.51c1.57.79,2.44,2.52,2.13,4.25l-10.84,60.68c-.17.94-.98,1.62-1.93,1.62l-12.3,2.24c-2.93.64-5.48,2.43-7.05,4.98-3.54,5.72-7.77,15.75-8.68,19.23l-9.52,32.66c-.23.86-1.01,1.45-1.9,1.45H3.97c-2.57,0-4.46-2.4-3.86-4.9Z'
            />
          </g>
        </svg>
        <p className={styles.iconTitle}>El Cap Spire</p>
      </div>

      <div className={styles.iconGroup}>
        <svg
          id='great-roof'
          data-name='Great Roof'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 96.16 126.03'
          height={height}
        >
          <defs>
            <style>{`
          .icon {
            fill: #fff;
            stroke-width: 0px;
          }
          `}</style>
          </defs>
          <g id='great-roof-g' data-name='Great Roof'>
            <path
              className='icon'
              d='m35.75,52.76c-2.1-2.02-14.82-13.95-16.56-15.58-.13-.12-.29-.21-.46-.25l-10.26-2.37c-1.44-.33-2.47-1.58-2.53-3.05-.09-2.12-.33-4.91-.94-5.52-.81-.81-3.56-2.91-4.6-3.7-.25-.19-.4-.49-.4-.81v-7.8c0-.42.25-.79.64-.94C5.28,10.95,33.82,0,43,0c10,0,18,3,21,7s2,6,8,6c4.91,0,18.52,2.01,23.31,2.74.76.12,1.12,1.01.64,1.62l-15.65,20.25c-.19.25-.49.39-.8.39h-2.76c-.44,0-.83.29-.97.71l-28.78,87.29c-.03.1-10-.04-10-1s2-19,2-29c0-7-2.95-42.66-2.95-42.66-.03-.22-.14-.42-.3-.58Z'
            />
          </g>
        </svg>
        <p className={styles.iconTitle}>The Great Roof</p>
      </div>

      <div className={styles.iconGroup}>
        <svg
          id='the-nipple'
          data-name='The Nipple'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 49.79 91.89'
          height={height}
        >
          <defs>
            <style>{`
        .icon {
          fill: #fff;
          stroke-width: 0px;
        }
        `}</style>
          </defs>
          <g id='the-nipple-g' data-name='The Nipple 2'>
            <path
              className='icon'
              d='m20,0c-.69,0,.74,5.36,1,6,2,5,6,19,13,28,3.97,5.1,8,9.71,8,12s-7.71,11.14-10,18c-2.04,6.13-9,11-13,14-7.76,5.82-19,9.05-19,11.34s2.4,3.01,4.57,2.29c6.86-2.29,22.85-11.43,29.71-20.57,2.74-3.66,4.44-10.49,6.72-15.06,1-2,2.42-3.22,4.7-5.51l3.78-3.78c.42-.42.41-1.11-.04-1.52-1.57-1.42-5.67-6.34-6.74-7.79-3.86-5.19-10.7-15.41-14.7-25.41-.85-2.12-3-7-3-7C23,1,21,0,20,0Z'
            />
          </g>
        </svg>
        <p className={styles.iconTitle}>The Nipple</p>
      </div>
    </div>
  )
}

export default Icons
