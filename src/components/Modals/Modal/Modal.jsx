import { MODAL_TYPES } from 'Constants/constants'
import { useEffect } from 'react'

import Cross from '../../Core/Cross/Cross'
import Add from '../Add/Add'
import Converter from '../Converter/Converter'
import Edit from '../Edit/Edit'
import Message from '../Message/Message'
import styles from './Modal.module.scss'

function Modal(props) {
  const { type, onModalClose, currency } = props
  const handlePressEscape = (e) => {
    if (e.key === 'Escape') {
      onModalClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handlePressEscape)
    return () => document.removeEventListener('keydown', handlePressEscape)
  }, [])

  return (
    <article className={styles.wrapper}>
      <section className={styles.window} data-testid="modal-window">
        <Cross onModalClose={() => onModalClose()} />
        <div className={styles.inner} data-testid={`${type}-component`}>
          {type === MODAL_TYPES.converter && <Converter currency={currency} />}
          {type === MODAL_TYPES.edit && <Edit />}
          {type === MODAL_TYPES.message && <Message />}
          {type === MODAL_TYPES.add && <Add />}
        </div>
      </section>
    </article>
  )
}

export default Modal
