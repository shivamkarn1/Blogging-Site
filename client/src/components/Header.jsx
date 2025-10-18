import { useRef } from "react"
import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }



  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8 relative z-10">


        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-amber-600 bg-amber-50/70 rounded-full text-sm text-amber-700 shadow-sm">
          <p className="font-medium">New : AI feature Implemented</p>
          <img src={assets.star_icon} className='w-3' alt="staricon" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold sm:leading-tight text-amber-900">
          Your own <span className="text-amber-600">Blogging</span> <br /> Site.
        </h1>

        <p className="mt-4 text-amber-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Share ideas, stories, and expertise—write with clarity, connect with readers, and grow your audience.
        </p>

        <form onSubmit={onSubmitHandler} className="mt-6 flex items-center justify-center" role="search" aria-label="Search blogs">
          <div className="w-full max-w-2xl">
            <label htmlFor="search" className="sr-only">Search blogs</label>
            <div className="flex overflow-hidden rounded-full border border-amber-200 bg-white shadow-lg">
              <input
                ref={inputRef}
                id="search"
                name="search"
                type="search"
                placeholder="Search for blogs, topics, or authors"
                required
                className="flex-1 px-4 py-3 text-sm sm:text-base placeholder-amber-300 text-amber-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 text-white text-sm sm:text-base font-semibold hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-amber-300/40 transition shadow-xl"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                </svg>
                Search
              </button>
            </div>
            <p className="mt-2 text-xs text-amber-600 text-center">Try: "React hooks", "Tailwind CSS", "AI writing"</p>
          </div>
        </form>

      </div>

      <div className="text-center">
        {
          input && <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">Clear Search</button>
        }
      </div>

      {/* decorative gradient background */}
      <div className="pointer-events-none absolute inset-0 -top-24 -z-10 flex items-start justify-center">
        <div className="w-[900px] h-[420px] rounded-3xl blur-3xl opacity-30 bg-gradient-to-tr from-amber-200 via-yellow-300 to-rose-400 transform rotate-6" />
      </div>

      <img src={assets.gradientBackground} alt="bg" className="hidden" />
    </div>
  )
}

export default Header
