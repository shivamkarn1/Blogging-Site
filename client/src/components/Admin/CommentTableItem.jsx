import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { showSuccessToast, showErrorToast } from '../../utils/toast'
import Moment from 'moment'

const CommentTableItem = ({ comment, index, fetchComments }) => {
  const { axios, token } = useAppContext()

  const approveComment = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/admin/approve-comment`,
        { commentId: comment._id }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      
      if (data.success) {
        showSuccessToast('Comment approved successfully')
        fetchComments()
      } else {
        showErrorToast(data.message)
      }
    } catch (error) {
      console.error('Approve comment error:', error)
      showErrorToast(error.response?.data?.message || error.message)
    }
  }

  const deleteComment = async () => {
    const confirm = window.confirm('Are you sure you want to delete this comment?')
    if (!confirm) return

    try {
      const { data } = await axios.post(
        `/api/v1/admin/delete-comment`,
        { commentId: comment._id }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      
      if (data.success) {
        showSuccessToast('Comment deleted successfully')
        fetchComments()
      } else {
        showErrorToast(data.message)
      }
    } catch (error) {
      console.error('Delete comment error:', error)
      showErrorToast(error.response?.data?.message || error.message)
    }
  }

  return (
    <tr className="hover:bg-amber-50">
      <td className='px-6 py-4'>
        <div className="space-y-2">
          <p className="font-medium text-amber-900">
            {comment.blogId?.title || comment.blogId || 'Unknown Blog'}
          </p>
          <p className="text-sm text-amber-700">
            <strong>{comment.name}:</strong> {comment.content}
          </p>
        </div>
      </td>
      <td className='px-6 py-4 max-sm:hidden text-amber-600'>
        {Moment(comment.createdAt).format('MMM DD, YYYY')}
      </td>
      <td className='px-6 py-4'>
        <div className="flex gap-2">
          {!comment.isApproved && (
            <button
              onClick={approveComment}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
            >
              Approve
            </button>
          )}
          <button
            onClick={deleteComment}
            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
