import {useNavigate,Outlet} from "react-router-dom"
import { assets } from '../../assets/assets'
import Sidebar from "../../components/Admin/Sidebar"
const Layout = () => {
  const navigate = useNavigate()

  const logout = ()=>{
    navigate('/')
  }
  return (
    <>
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-amber-50 via-yellow-50 to-rose-50 border-b border-amber-200 shadow-sm">
        <img 
          src="../../public/blogify-high-resolution-logo.png"
          alt="Blogify logo" 
          className='h-40 sm:h-28 md:h-16 w-auto object-contain rounded-4xl border border-amber-800'
        />
        
        <button 
          onClick={logout} 
          className='cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-rose-300/40 shadow-lg transition-transform group'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>


      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar/>
        <Outlet/>
      </div>

    </>
  )
}

export default Layout
