import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      
      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Spinning loader */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
          </div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-amber-900 mb-2">Loading...</h2>
          <p className="text-sm text-amber-600">Please wait while we fetch your content</p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>

      {/* Decorative gradient background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-amber-200 via-yellow-300 to-rose-400 animate-pulse"></div>
      </div>
    </div>
  )
}

export default Loader