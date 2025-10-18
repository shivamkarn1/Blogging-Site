import { useEffect } from "react"
import { assets, dashboard_data } from "../../assets/assets"
import { useState } from "react"
import BlogTableItem from "../../components/Admin/BlogTableItem"
import { useAppContext } from "../../context/AppContext"
import { toast } from "sonner"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })
  const [loading, setLoading] = useState(true)

  const { axios, token } = useAppContext()

  const fetchDashboardData = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.get("/api/v1/admin/dashboard", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      console.log('Dashboard API response:', data) // Debug log
      
      if (data.success) {
        // Ensure all numeric values are properly set with fallbacks
        const responseData = data.data || {}
        setDashboardData({
          blogs: responseData.blogs || 0,
          comments: responseData.comments || 0,
          drafts: responseData.drafts || 0,
          recentBlogs: responseData.recentBlogs || []
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Dashboard error:', error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchDashboardData()
    } else {
      // Check localStorage for token
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setTimeout(() => {
          fetchDashboardData()
        }, 100)
      } else {
        setLoading(false)
      }
    }
  }, [token])

  // Helper function to safely add numbers
  const getTotalArticles = () => {
    const blogs = Number(dashboardData.blogs) || 0
    const drafts = Number(dashboardData.drafts) || 0
    return blogs + drafts
  }

  if (loading) {
    return (
      <div className="p-6 bg-amber-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Dashboard</h1>
        <p className="text-amber-600">Overview of your blog statistics</p>
      </div>

      {/* Overview Summary Card */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl shadow-lg border border-amber-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Content Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-900">{getTotalArticles()}</p>
            <p className="text-sm text-amber-600">Total Articles</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-900">{dashboardData.blogs || 0}</p>
            <p className="text-sm text-amber-600">Published</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-900">{dashboardData.drafts || 0}</p>
            <p className="text-sm text-amber-600">Drafts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-900">{dashboardData.comments || 0}</p>
            <p className="text-sm text-amber-600">Comments</p>
          </div>
        </div>
      </div>

      {/* Individual Metric Cards
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <img src={assets.dashboard_icon_1} alt="" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-bold text-amber-900">{dashboardData.blogs || 0}</p>
            <p className="text-amber-600 font-medium">Published Blogs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <img src={assets.dashboard_icon_2} alt="" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-bold text-amber-900">{dashboardData.comments || 0}</p>
            <p className="text-amber-600 font-medium">Total Comments</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <img src={assets.dashboard_icon_3} alt="" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-bold text-amber-900">{dashboardData.drafts || 0}</p>
            <p className="text-amber-600 font-medium">Draft Posts</p>
          </div>
        </div>
      </div> */}

      {/* Latest blogs section */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="p-6 border-b border-amber-100">
          <div className="flex items-center gap-3 text-amber-600">
            <img src={assets.dashboard_icon_4} alt="" className="w-6 h-6" />
            <h2 className="text-xl font-bold text-amber-900">Latest Blogs</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-amber-50 border-b border-amber-100">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-amber-800 font-semibold">#</th>
                <th scope="col" className="px-4 py-3 text-left text-amber-800 font-semibold">Blog Title</th>
                <th scope="col" className="px-4 py-3 text-left text-amber-800 font-semibold max-sm:hidden">Date</th>
                <th scope="col" className="px-4 py-3 text-left text-amber-800 font-semibold max-sm:hidden">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-amber-800 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => {
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index + 1} />
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-amber-600">
                    <p>No recent blogs found</p>
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

export default Dashboard
