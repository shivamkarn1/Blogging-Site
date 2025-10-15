import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Dashboard from './pages/Admin/Dashboard'
import Layout from './pages/Admin/Layout'
import AddBlog from './pages/Admin/AddBlog'
import ListBlog from './pages/Admin/ListBlog'
import Comments from './pages/Admin/Comments'
import Login from './components/Admin/Login'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/blog/:id' element={<Blog/>}/>


        {/* Routes for admin page */}
        <Route path='/admin' element={true?<Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>


      </Routes>
    </div>
  )
}

export default App
