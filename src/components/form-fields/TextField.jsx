import React from 'react'

const TextField = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="m-1">
      <label htmlFor={props.name} className="col col-form-label text-md-right">{label}</label>
      <input
        id={props.name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...props}
      />
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  )
}

export default TextField