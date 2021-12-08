import React from 'react'

const Button = ({ type, label, disabled, onClick }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="btn btn-primary">
      {label}
    </button>
  )
}

export default Button
