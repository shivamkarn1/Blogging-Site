import React from 'react'
import { assets } from '../../assets/assets'
import {useAppContext} from "../../context/AppContext"
import { toast } from 'sonner';

const BlogTableItem = ({blog,fetchBlogs,index}) => {
  
  const {title,createdAt} = blog;
  const BlogDate = new Date(createdAt)
  const {axios} = useAppContext()

  const deleteBlog = async()=>{
    const confirm = window.confirm("Are you sure you want to delete the blog?")
    if(!confirm) return;
    
    try {
      // Use blogId (this should match your backend controller expectation)
      const {data} = await axios.post('/api/v1/blog/delete', {blogId: blog._id})
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Delete blog error:', error);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const togglePublish = async()=>{
    try {
      // Use blogId (this should match your backend controller expectation)  
      const {data} = await axios.post("/api/v1/blog/toggle-publish", {blogId: blog._id})
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Toggle publish error:', error);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return ( 
    <>
    <tr className="border-b border-amber-100 hover:bg-amber-50/50 transition-colors">
      <th className="px-4 py-3 text-left text-amber-900 font-medium">{index}</th>
      <td className="px-4 py-3 text-amber-800 font-medium max-w-xs truncate">{title}</td>
      <td className="px-4 py-3 text-amber-600 text-sm max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-4 py-3 max-sm:hidden">
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
          blog.isPublished 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePublish}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              blog.isPublished 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            }`}
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>
          {/* Added onClick handler */}
          <button 
            onClick={deleteBlog}
            className="p-1.5 rounded-lg hover:bg-red-100 transition-colors group"
            title="Delete blog"
          >
            <img src={assets.cross_icon} alt="Delete" className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </td>
    </tr>
    </>
  )
}

export default BlogTableItem
