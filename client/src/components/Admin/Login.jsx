import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
    // Add your login logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8">
          <div className="text-center mb-8">
            <h1 className='text-3xl font-bold text-amber-900 mb-2'>
              <span className='text-amber-600'>Admin</span> Login
            </h1>
            <p className='text-amber-700 text-sm'>Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold text-amber-900 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400'
                placeholder='Enter email....'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-amber-900 mb-2'>
                Password
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 text-amber-900 placeholder-amber-400'
                placeholder='.............'
                required
              />
            </div>

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center text-amber-700 cursor-pointer group'>
              
              </label>
              
            </div>

            <button
              type='submit'
              className='w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5'
            >
              Login to Dashboard
            </button>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className='absolute -z-10 top-0 -left-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -z-10 bottom-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse' style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  )
}

export default Login