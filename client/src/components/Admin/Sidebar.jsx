import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full bg-gradient-to-b from-gray-50 to-white shadow-sm'>
      {/* Sidebar Header */}
      <div className='px-6 py-8 border-b border-gray-200'>
        <h2 className='text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
          Admin Panel
        </h2>
        <p className='text-xs text-gray-500 mt-1 hidden md:block'>Manage your content</p>
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-col gap-2 p-4 flex-1'>
        <NavLink 
          end={true} 
          to="/admin" 
          className={({ isActive }) => 
            `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
              isActive 
                ? 'bg-primary/5 text-primary border-l-4 border-primary shadow-sm' 
                : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/10 rotate-0' : 'group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110'
              }`}>
                <img src={assets.home_icon} alt="" className='w-5 h-5'/>
              </div>
              <p className='hidden md:inline-block font-medium text-sm transition-transform duration-300 group-hover:translate-x-1'>
                Dashboard
              </p>
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                isActive ? 'hidden' : ''
              }`}></div>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/admin/addBlog" 
          className={({ isActive }) => 
            `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
              isActive 
                ? 'bg-primary/5 text-primary border-l-4 border-primary shadow-sm' 
                : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/10 rotate-0' : 'group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110'
              }`}>
                <img src={assets.add_icon} alt="" className='w-5 h-5'/>
              </div>
              <p className='hidden md:inline-block font-medium text-sm transition-transform duration-300 group-hover:translate-x-1'>
                Add Blogs
              </p>
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                isActive ? 'hidden' : ''
              }`}></div>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/admin/listBlog" 
          className={({ isActive }) => 
            `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
              isActive 
                ? 'bg-primary/5 text-primary border-l-4 border-primary shadow-sm' 
                : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/10 rotate-0' : 'group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110'
              }`}>
                <img src={assets.list_icon} alt="" className='w-5 h-5'/>
              </div>
              <p className='hidden md:inline-block font-medium text-sm transition-transform duration-300 group-hover:translate-x-1'>
                List Blogs
              </p>
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                isActive ? 'hidden' : ''
              }`}></div>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/admin/comments" 
          className={({ isActive }) => 
            `relative overflow-hidden group flex items-center gap-4 py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
              isActive 
                ? 'bg-primary/5 text-primary border-l-4 border-primary shadow-sm' 
                : 'hover:bg-gray-50 text-gray-700 border-l-4 border-transparent hover:border-primary/30'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/10 rotate-0' : 'group-hover:bg-primary/5 group-hover:-rotate-12 group-hover:scale-110'
              }`}>
                <img src={assets.comment_icon} alt="" className='w-5 h-5'/>
              </div>
              <p className='hidden md:inline-block font-medium text-sm transition-transform duration-300 group-hover:translate-x-1'>
                Comments
              </p>
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out ${
                isActive ? 'hidden' : ''
              }`}></div>
            </>
          )}
        </NavLink>
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-gray-200 hidden md:block'>
        <div className='bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4'>
          <p className='text-xs font-semibold text-gray-700 mb-1'>Need Help?</p>
          <p className='text-xs text-gray-500'>Check our documentation</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar