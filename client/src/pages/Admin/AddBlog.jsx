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
    e.preventDefault();
    
    // Manual validation for file input
    if (!featuredImage) {
      toast.error('Please select a featured image');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!subTitle.trim()) {
      toast.error('Please enter a subtitle');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    try {
      setIsAdding(true)

      const formData = new FormData();
      
      formData.append('title', title.trim());
      formData.append('subTitle', subTitle.trim());
      formData.append('description', quillRef.current.root.innerHTML);
      formData.append('category', category);
      formData.append('isPublished', isPublished.toString());
      formData.append('featuredImage', featuredImage);

      const {data} = await axios.post('/api/v1/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if(data.success){
        toast.success(data.message || 'Blog added successfully!')
        // Reset form
        setFeaturedImage(false)
        setTitle('')
        setSubTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
        setIsPublished(false)
      }else{
        toast.error(data.message || 'Failed to add blog')
      }
      
    } catch (error) {
      console.error('Add blog error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add blog')
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
                Featured Image *
              </label>
              <label htmlFor="featuredImage" className="block group">
                <div className={`relative h-48 w-full rounded-lg border-2 border-dashed overflow-hidden cursor-pointer transition-colors bg-amber-50/50 ${
                  featuredImage ? 'border-green-300' : 'border-amber-300 hover:border-orange-400'
                }`}>
                  <img 
                    src={!featuredImage ? assets.upload_area : URL.createObjectURL(featuredImage)} 
                    alt="" 
                    className="h-full w-full object-cover"
                  />
                  {!featuredImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-amber-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-slate-500 text-sm">Click to upload featured image</span>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                  {featuredImage && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* REMOVED required attribute and added manual validation */}
                <input 
                  onChange={(e) => setFeaturedImage(e.target.files[0])} 
                  type="file" 
                  id="featuredImage" 
                  hidden 
                  accept="image/*"
                />
              </label>
            </div>

            {/* Blog Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Title *
              </label>
              <input 
                onChange={e => setTitle(e.target.value)} 
                value={title} 
                type="text" 
                placeholder="Enter a compelling title" 
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Sub Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Subtitle *
              </label>
              <input 
                onChange={e => setSubTitle(e.target.value)} 
                value={subTitle} 
                type="text" 
                placeholder="Add a brief description" 
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-slate-900 placeholder-slate-400 transition-all"
              />
            </div>

            {/* Blog Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Content *
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
                Category *
              </label>
              <div className="relative">
                <select 
                  onChange={e => setCategory(e.target.value)} 
                  value={category}
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