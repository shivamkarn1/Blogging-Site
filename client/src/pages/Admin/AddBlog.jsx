import { useState, useRef, useEffect } from "react"
import { assets, blogCategories } from "../../assets/assets"
import Quill from 'quill'
import { useAppContext } from "../../context/AppContext"
import {toast} from "sonner"

const AddBlog = () => {
  const {axios} = useAppContext()

  const [isAdding,setIsAdding] = useState(false)
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [featuredImage, setFeaturedImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      // Create FormData and append individual fields (NOT as stringified object)
      const formData = new FormData();
      
      // Append each field separately
      formData.append('title', title);
      formData.append('subTitle', subTitle);
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('category', category);
      formData.append('isPublished', isPublished.toString()); // Convert boolean to string
      
      // Append the image file with the correct field name
      if (featuredImage) {
        formData.append('featuredImage', featuredImage);
      }

      // Debug: Log what we're sending
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const {data} = await axios.post('/api/v1/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if(data.success){
        toast.success(data.message)
        // Reset form
        setFeaturedImage(false)
        setTitle('')
        setSubTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
        setIsPublished(false)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.error('Add blog error:', error);
      toast.error(error.response?.data?.message || error.message)
    }finally{
      setIsAdding(false)
    }
  }

  const generateContent = async () => {}

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <div className="flex-1 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 h-full overflow-y-auto">
      <div className="w-full max-w-5xl px-6 py-12 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
          <p className="text-slate-600 mt-2">Fill in the details below to publish your blog</p>
        </div>

        <form onSubmit={onSubmitHandler} className="bg-white rounded-lg shadow-sm border border-amber-200 overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Upload Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Featured Image
              </label>
              <label htmlFor="featuredImage" className="block group">
                <div className="relative h-48 w-full rounded-lg border-2 border-dashed border-amber-300 overflow-hidden cursor-pointer hover:border-orange-400 transition-colors bg-amber-50/50">
                  <img 
                    src={!featuredImage ? assets.upload_area : URL.createObjectURL(featuredImage)} 
                    alt="" 
                    className="h-full w-full object-cover"
                  />
                  {!featuredImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-slate-500 text-sm">Click to upload thumbnail</span>
                    </div>
                  )}
                </div>
                <input 
                  onChange={(e) => setFeaturedImage(e.target.files[0])} 
                  type="file" 
                  id="featuredImage" 
                  hidden 
                  required 
                />
              </label>
            </div>

            {/* Blog Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Title
              </label>
              <input 
                onChange={e => setTitle(e.target.value)} 
                value={title} 
                type="text" 
                placeholder="Enter a compelling title" 
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Sub Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Subtitle
              </label>
              <input 
                onChange={e => setSubTitle(e.target.value)} 
                value={subTitle} 
                type="text" 
                placeholder="Add a brief description" 
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Blog Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Content
              </label>
              <div className="relative">
                <div 
                  ref={editorRef}
                  className="min-h-[20rem] border border-amber-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-400 transition-all"
                ></div>
                <button 
                  type="button" 
                  onClick={generateContent} 
                  className="absolute bottom-4 right-4 text-sm font-medium text-orange-700 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border border-amber-300 transition-all px-4 py-2 rounded-md shadow-sm"
                >
                  Generate with AI
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Category
              </label>
              <div className="relative">
                <select 
                  onChange={e => setCategory(e.target.value)} 
                  value={category}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-900 bg-white transition-all cursor-pointer appearance-none pr-10"
                >
                  <option value="">Select a category</option>
                  {blogCategories.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center gap-3 pt-4 border-t border-amber-100">
              <input 
                type="checkbox" 
                id="publish-toggle"
                checked={isPublished} 
                className="w-4 h-4 rounded border-amber-300 text-orange-500 focus:ring-2 focus:ring-orange-400 cursor-pointer" 
                onChange={e => setIsPublished(e.target.checked)}
              />
              <label htmlFor="publish-toggle" className="text-sm font-medium text-slate-700 cursor-pointer">
                Publish immediately
              </label>
            </div>

          </div>

          {/* Form Actions */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-8 py-4 border-t border-amber-200 flex justify-end gap-3">
            <button 
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Save Draft
            </button>
            <button 
              disabled={isAdding}
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? "Adding..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBlog