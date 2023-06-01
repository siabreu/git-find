import React from 'react'
import './styles.css'

const Input = ({user, onChange}) => {
  return (
    <input
        name="usuario"
        value={user}
        onChange={onChange}
        placeholder="@username"
    />
  )
}

export default Input