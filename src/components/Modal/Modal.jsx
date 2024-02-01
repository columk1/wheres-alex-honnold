import styles from './Modal.module.css'
import { useEffect, useRef } from 'react'

export default function Modal({ openModal, closeModal, children, buttonText }) {
  const dialogRef = useRef()

  useEffect(() => {
    if (openModal) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [openModal])

  return (
    <dialog ref={dialogRef} onCancel={closeModal}>
      {children}
      <button className={styles.btn} onClick={closeModal}>
        {buttonText}
      </button>
    </dialog>
  )
}
