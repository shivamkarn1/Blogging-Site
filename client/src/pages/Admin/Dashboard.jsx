import { useEffect } from "react"
import {assets,dashboard_data} from "../../assets/assets"
import { useState } from "react"
import BlogTableItem from "../../components/Admin/BlogTableItem"
const Dashboard = () => {
  const [dashboardData,setDashboardData] = useState({
    blogs:0,
    comments:0  ,
    drafts:0,
    recentBlogs:[]
  })

  const fetchDashboardData = async()=>{
    setDashboardData(dashboard_data)
  }

  useEffect(()=>{
    fetchDashboardData()
  },[])

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <div className="flex flex-wrap gap-6">

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <img src={assets.dashboard_icon_1} alt="" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-bold text-amber-900">{dashboardData.blogs}</p>
            <p className="text-amber-600 font-medium">Blogs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <img src={assets.dashboard_icon_2} alt="" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-bold text-amber-900">{dashboardData.comments}</p>
            <p className="text-amber-600 font-medium">Comments</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <img src={assets.dashboard_icon_3} alt="" className="w-12 h-12" />
          <div>
            <p className="text-3xl font-bold text-amber-900">{dashboardData.drafts}</p>
            <p className="text-amber-600 font-medium">Drafts</p>
          </div>
        </div>
      </div>

      {/* latest blog heading */}
      <div className="flex items-center gap-3 m-4 mt-6 text-amber-600">
        <img src={assets.dashboard_icon_4} alt="" />
        <p>Latest Blogs</p>
      </div>

      {/* table here */}
      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-amber-900">
          <thead className="text-xs text-amber-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6"> # </th>
              <th scope="col" className="px-2 py-4"> Blog Title </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden"> Date </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden"> Status </th>
              <th scope="col" className="px-2 py-4"> Actions </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentBlogs.map((blog,index)=>{
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index+1}/>
            })}
          </tbody>
        </table>
      </div>



    </div>
  )
}

export default Dashboard
