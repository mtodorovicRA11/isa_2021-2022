import React from 'react'

const TextField = ({
  label,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="col-md-4 col-form-label text-md-right">{label}</label>
      <input
        id={props.name}
        className="form-control"
        {...props}
      />
    </div>
  )
}

export default TextField
