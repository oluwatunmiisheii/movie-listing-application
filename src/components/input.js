import React from 'react';

const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="text-capitalize">{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

export default Input;