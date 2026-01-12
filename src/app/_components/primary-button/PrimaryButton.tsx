import React from 'react'

type PrimaryButtonProps = {
  text: string; 
}

const PrimaryButton = ({text}: PrimaryButtonProps) => {
  return (
    <button className='border px-4 py-1 border-main-color text-main-color rounded-full uppercase'>
        {text}
    </button>
  )
}

export default PrimaryButton;