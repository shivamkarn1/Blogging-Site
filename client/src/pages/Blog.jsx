import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { assets,blog_data,comments_data } from '../assets/assets'
import Navbar from "../components/Navbar"
import Moment from 'moment'
import Footer from "../components/Footer"
import Loader from "../components/Loader"


const Blog = () => {
  const {id} = useParams()

  const [data,setData] = useState(null)
  const [comments,setComments] = useState([])

  const [name,setName] = useState('')
  const [content,setContent] = useState('')

  const fetchBlogData = async()=>{
    const data = blog_data.find(item=>item._id ===id)
    setData(data)
  }

  const fetchComments = async ()=>{
    setComments(comments_data)

  }
  const addComment = async(e)=>{
    e.preventdefault()
  }


  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])
  return data ? (
    <div className='relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50'>
      {/* Decorative gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center">
        <div className="w-[900px] h-[420px] rounded-3xl blur-3xl opacity-20 bg-gradient-to-tr from-amber-200 via-yellow-300 to-rose-400 transform rotate-6" />
      </div>

      <Navbar/>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 text-white shadow-sm">
            Published
          </span>
          <p className="text-sm text-amber-600 font-medium">
            {Moment(data.createdAt).format('MMMM Do, YYYY')}
          </p>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-900 leading-tight mb-3">
          {data.title}
        </h1>

        <h2 className="text-lg sm:text-2xl text-amber-700 font-medium mb-6">
          {data.subTitle}
        </h2>

        <p className="flex items-center gap-2 text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-semibold">Shivam Karn</span>
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5 shadow-lg border border-amber-200' />
        <div className='rich-text max-w-3xl mx-auto text-amber-800' dangerouslySetInnerHTML={{__html:data.description}}></div>
      </div>

      {/* Comments Section */}
      <div className='mt-14 mb-10 max-w-3xl mx-auto px-6'>
        <h3 className='text-2xl font-bold text-amber-900 mb-4'>
          Comments <span className='text-amber-600'>({comments.length})</span>
        </h3>
        
        <div className='bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden'>
          {comments.map((item,index)=>(
            <div key={index} className={`p-4 hover:bg-amber-25 transition-colors ${index !== comments.length - 1 ? 'border-b border-amber-100' : ''}`}>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3 flex-1'>
                  <img src={assets.user_icon} alt="User avatar" className='w-9 h-9 rounded-full border-2 border-amber-200 flex-shrink-0'/>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <p className='font-medium text-amber-900 text-sm'>{item.name}</p>
                      <span className='text-xs text-amber-500'>
                        {Moment(item.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className='text-sm text-amber-700 leading-relaxed'>{item.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add comment section box */}
      <div className='max-w-3xl mx-auto px-6 mb-12'>
          <div className='bg-white rounded-2xl border border-amber-100 shadow-lg p-6 sm:p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-md'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h4 className='text-xl font-bold text-amber-900'>Join the Conversation</h4>
                <p className='text-sm text-amber-600'>Share your thoughts and insights</p>
              </div>
            </div>
            
            <form onSubmit={addComment} className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-amber-900 mb-2'>Your Name</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input 
                    onChange={(e)=>setName(e.target.value)}
                    type="text" 
                    placeholder='Enter your name' 
                    required 
                    className='w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-amber-100 bg-amber-50/30 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white transition-all'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-amber-900 mb-2'>Your Comment</label>
                <textarea 
                  onChange={(e)=>setContent(e.target.value)}
                  placeholder='What are your thoughts?'
                  rows={5}
                  required
                  className='w-full px-4 py-3.5 rounded-xl border-2 border-amber-100 bg-amber-50/30 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white transition-all resize-none'
                />
              </div>
              
              <div className='flex items-center justify-between pt-2'>
                <p className='text-xs text-amber-600'>Your comment will be posted publicly</p>
                <button 
                  type='submit'
                  className='px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-rose-500 text-white font-bold hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-amber-300/50 shadow-lg transition-all duration-200'
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
          {/* social media icons / share buttons */}
          <div className='my-24 max-w-3xl mx-auto'>
            <p className='font-semibold my-4'>Share this article to Social Media</p>
            <div className="flex">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.googleplus_icon} alt="" />
            </div>
          </div>

      </div>
      <Footer/>

    </div>
  ) : <Loader/>
}

export default Blog
