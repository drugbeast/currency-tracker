import { forwardRef, useImperativeHandle, useRef } from 'react'

import styles from './Input.module.scss'

const Input = forwardRef((props, ref) => {
  const { type, placeholder, value, onChange, onKeyDown } = props
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    blur() {
      inputRef.current.blur()
    },
  }))

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={styles.input}
      data-cy="elastic-search-input"
      ref={inputRef}
    />
  )
})

export default Input
