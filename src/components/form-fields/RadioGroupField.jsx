import React from 'react'

const RadioGroupField = ({
  label,
  options,
  onChange,
  value,
  name
}) => {
  const handleChange = (value) => {
    onChange(name, value);
  }

  return (
    <div className="m-1">
      <label className="col col-form-label text-md-right">{label}</label>
      {options.map(option => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option}
            checked={value === option}
            onChange={() => handleChange(option)} />
          <label className="form-check-label" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}

    </div>
  )
}

export default RadioGroupField
