import { useEffect } from 'react'

import Cross from '../../Core/Cross/Cross'
import Converter from '../Converter/Converter'
import Delete from '../Delete/Delete'
import Edit from '../Edit/Edit'
import Message from '../Message/Message'
import styles from './Modal.module.scss'

function Modal({ type, setShow, currency }) {
  const handlePressEscape = e => {
    if (e.key === 'Escape') {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape)
    return () => document.removeEventListener('keydown', handlePressEscape)
  }, [])

  return (
    <article className={styles.container}>
      <section className={styles.window}>
        <Cross setShow={setShow} />
        <div className={styles.inner}>
          {type === 'converter' && <Converter currency={currency} />}
          {type === 'edit' && <Edit />}
          {type === 'delete' && <Delete />}
          {type === 'message' && <Message />}
        </div>
      </section>
    </article>
  )
}

export default Modal
