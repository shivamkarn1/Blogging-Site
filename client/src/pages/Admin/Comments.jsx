import { useState, useEffect } from 'react'
import CommentTableItem from '../../components/Admin/CommentTableItem'
import { useAppContext } from "../../context/AppContext"
import { toast } from 'sonner'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState("Not Approved")
  const [loading, setLoading] = useState(true)

  const { axios, token } = useAppContext()

  const fetchComments = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.get("/api/v1/admin/comments", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (data.success) {
        setComments(data.data || []) 
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Fetch comments error:', error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchComments()
    } else {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setTimeout(() => {
          fetchComments()
        }, 100)
      } else {
        setLoading(false)
      }
    }
  }, [token])

  if (loading) {
    return (
      <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-yellow-50/50 flex items-center justify-center'>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-yellow-50/50'>
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className='text-xl font-semibold shadow rounded-md text-amber-800'>
          Comments ({comments.length})
        </h1>
        <div className='flex gap-4'>
          <button 
            onClick={() => setFilter("Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors ${
              filter === "Approved" 
                ? "bg-amber-500 text-white border-amber-500" 
                : "text-gray-700 hover:bg-amber-50"
            }`}
          >
            Approved ({comments.filter(c => c.isApproved === true).length})
          </button>
          <button 
            onClick={() => setFilter("Not Approved")}
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors ${
              filter === "Not Approved" 
                ? "bg-amber-500 text-white border-amber-500" 
                : "text-gray-700 hover:bg-amber-50"
            }`}
          >
            Not Approved ({comments.filter(c => c.isApproved === false).length})
          </button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg'>
        <table className='w-full text-md text-amber-600'>
          <thead className='text-md text-amber-700 text-left uppercase bg-amber-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title and Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            {comments.filter((comment) => {
              if (filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).length > 0 ? (
              comments.filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              }).map((comment, index) => (
                <CommentTableItem 
                  key={comment._id} 
                  comment={comment} 
                  index={index + 1} 
                  fetchComments={fetchComments} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-amber-600">
                  <p>No {filter.toLowerCase()} comments found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
