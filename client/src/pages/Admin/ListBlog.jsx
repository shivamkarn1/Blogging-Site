import { useEffect, useState } from 'react'
import BlogTableItem from '../../components/Admin/BlogTableItem'
import { useAppContext } from "../../context/AppContext"
import { showSuccessToast, showErrorToast } from "../../utils/toast"

const ListBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios, token } = useAppContext() // Get token from context

  const fetchBlogs = async () => {
    if (!token) {
      console.log('No token available, skipping fetch');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching blogs with token:', token ? 'Present' : 'Missing');
      
      const { data } = await axios.get('/api/v1/blog/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}` // Explicitly set the token
        }
      })
      console.log('Fetch blogs response:', data);
      
      if (data.success) {
        setBlogs(data.data || [])
      } else {
        showErrorToast(data.message)
      }
    } catch (error) {
      console.error('Fetch blogs error:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      if (error.response?.status === 401) {
        showErrorToast('Authentication failed. Please login again.');
      } else {
        showErrorToast(error.response?.data?.message || error.message)
      }
    } finally {
      setLoading(false);
    }
  }

  // Wait for token to be available before fetching
  useEffect(() => {
    if (token) {
      fetchBlogs();
    } else {
      // Token might be loading from localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Token exists but context hasn't updated yet, wait a bit
        setTimeout(() => {
          fetchBlogs();
        }, 100);
      } else {
        setLoading(false);
        showErrorToast('Please login to access admin panel');
      }
    }
  }, [token]) // Depend on token

  if (loading) {
    return (
      <div className='p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 min-h-screen'>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <p className="ml-4 text-amber-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50 min-h-screen'>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">All Blogs</h1>
        <p className="text-amber-600">Manage and organize your blog posts ({blogs.length} posts)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-amber-100 to-yellow-100 border-b border-amber-200">
              <tr>
                <th scope="col" className="px-4 py-4 text-left text-amber-800 font-semibold">#</th>
                <th scope="col" className="px-4 py-4 text-left text-amber-800 font-semibold">Blog Title</th>
                <th scope="col" className="px-4 py-4 text-left text-amber-800 font-semibold max-sm:hidden">Date</th>
                <th scope="col" className="px-4 py-4 text-left text-amber-800 font-semibold max-sm:hidden">Status</th>
                <th scope="col" className="px-4 py-4 text-left text-amber-800 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {blogs.length > 0 ? (
                blogs.map((blog, index) => {
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-amber-600">
                    <div className="flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="font-medium">No blogs found</p>
                      <p className="text-sm">Create your first blog post to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListBlog
