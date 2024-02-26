import './Button.css'

function Button({ className, children, onClick, type }) {
  return (
    <button
      type="submit"
      className={type === 'delete' ? `${className} delete` : className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
