import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-3 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold text-amber-900'>Never miss a Blog!</h1>
      <p className='md:text-lg text-amber-700/80 pb-4 max-w-2xl'>
        Subscribe to get the latest posts, new tech, and exclusive updates.
      </p>

      <form className='flex items-center justify-center max-w-2xl w-full gap-3 px-4 sm:px-0' onSubmit={(e)=>e.preventDefault()} aria-label="Subscribe to newsletter">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>

        <div className="flex-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 p-[2px] rounded-full shadow-xl">
          <div className="flex items-center bg-white rounded-full px-4 py-2 sm:py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2.94 6.94A2 2 0 014.76 6h10.48a2 2 0 011.82.94L10 11.5 2.94 6.94z" />
              <path d="M18 8.25v5.5A2 2 0 0116 16H4a2 2 0 01-2-2.25v-5.5L10 12l8-3.75z" />
            </svg>

            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 text-sm sm:text-base placeholder-amber-500 text-amber-900 bg-transparent focus:outline-none"
              aria-label="Email"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 text-white font-semibold hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-amber-300/40 transition-shadow shadow-lg"
          aria-label="Subscribe"
        >
          Subscribe
        </button>
      </form>

      <p className='text-xs text-amber-600/80 mt-2'>We respect your privacy — unsubscribe anytime.</p>
    </div>
  )
}

export default Newsletter
