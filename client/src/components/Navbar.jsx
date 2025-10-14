import React from 'react'
import {assets} from "../assets/assets.js"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate();


  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={()=>navigate('/')} src="../../public/blogify-high-resolution-logo.png" alt="logo" className='cursor-pointer h-40 sm:h-28 md:h-16 w-auto object-contain rounded-4xl border border-amber-800'/>
      <button
        type="button"
        onClick={()=>navigate('/')}
        aria-label="Login"
        className="flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 shadow-md"
      >
        Login
        <img src={assets.arrow} className='w-3' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar
