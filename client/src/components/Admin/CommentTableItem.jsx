import React from 'react'
import { assets } from '../../assets/assets';

const CommentTableItem = ({comment,fetchComments}) => {
  const {blog,createdAt , _id} = comment;
  const BlogDate = new Date(createdAt)
  
  return (
    <tr className="border-b border-amber-100 hover:bg-amber-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-amber-700 text-sm min-w-fit">Blog:</span>
            <span className="text-amber-900 text-sm font-medium">{blog.title}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="font-semibold text-amber-700 text-sm min-w-fit">Name:</span>
            <span className="text-amber-800 text-sm">{comment.name}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <span className="font-semibold text-amber-700 text-sm min-w-fit">Comment:</span>
            <span className="text-amber-800 text-sm leading-relaxed">{comment.content}</span>
          </div>
        </div>
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        <span className="text-amber-600 text-sm font-medium">
          {BlogDate.toLocaleDateString()}
        </span>
      </td>

      <td className='px-6 py-4'>
        <div className="flex items-center gap-3">
          {!comment.isApproved ? (
            <button className="p-1.5 rounded-lg hover:bg-emerald-100 transition-colors group">
              <img 
                src={assets.tick_icon} 
                alt="Approve comment"
                className='w-5 h-5 group-hover:scale-110 transition-transform cursor-pointer'
              />
            </button>
          ) : (
            <span className='inline-flex items-center text-xs border border-emerald-600 text-emerald-700 bg-emerald-100 rounded-full px-3 py-1 font-medium'>
              Approved
            </span>
          )}
          
          <button className="p-1.5 rounded-lg hover:bg-red-100 transition-colors group">
            <img 
              src={assets.bin_icon} 
              alt="Delete comment"
              className='w-5 h-5 group-hover:scale-110 transition-transform cursor-pointer'
            />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
