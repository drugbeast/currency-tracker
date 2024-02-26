import './Input.css'

function Input({ type, min, max, name, onChange, value, className }) {
  return (
    <input
      type={type}
      min={min}
      max={max}
      name={name}
      onChange={onChange}
      value={value}
      className={className}
    />
  )
}

export default Input
