import React from 'react'
import { TwitterIcon } from './icons'

const Splash = () => {
  return (
    <div className='bg-indigo-700 h-full w-full fixed inset-0 z-50 grid place-content-center'>
      <TwitterIcon size={128} color={"fill-white"} />
    </div>
  )
}

export default Splash
