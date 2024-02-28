import React from 'react'

const Button = ({ children, handleOnClick, disabled = false }) => {
  return (
    <div>
      <button disabled={disabled} onClick={() => handleOnClick()} className='bg-white text-black py-2 px-4 rounded-lg font-medium'>{children}</button>
    </div>
  )
}

export default Button
