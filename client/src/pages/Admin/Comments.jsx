import {useState} from 'react'
import { comments_data } from '../../assets/assets'
import { useEffect } from 'react'
import CommentTableItem from '../../components/Admin/CommentTableItem'

const Comments = () => {
  
  const [comments,setComments] = useState([])
  const [filter,setFilter] = useState("Not Approved")

  const fetchComments = async()=>{
    setComments(comments_data)
  }

  useEffect(()=>{
    fetchComments()
  },[])
  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-yellow-50/50'>
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className='text-xl font-semibold shadow rounded-md text-amber-800 text-shadow-amber-900'>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={()=>setFilter("Approved")}
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}>Approved</button>
          <button onClick={()=>setFilter("Not Approved")}
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}>Not Approved</button>
        </div>
      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-md text-amber-600'>
          <thead className='text-md text-amber-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title and Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment)=>{
              if(filter==="Approved")return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment,index)=><CommentTableItem key={comment._id} comment={comment} index={index+1}fetchComments={fetchComments}/>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
