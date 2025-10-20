import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Admin/Dashboard";
import Layout from "./pages/Admin/Layout";
import AddBlog from "./pages/Admin/AddBlog";
import ListBlog from "./pages/Admin/ListBlog";
import Comments from "./pages/Admin/Comments";
import Login from "./components/Admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Only show main navbar on these specific routes
  const showMainNavbar =
    location.pathname === "/" || location.pathname.startsWith("/blog/");

  console.log("Current path:", location.pathname);
  console.log("Show main navbar:", showMainNavbar);

  return (
    <>
      {/* Only show main navbar on home and blog detail pages */}
      {/* {showMainNavbar && <Navbar />} */}

      {/* Add Toaster for notifications */}
      <Toaster position="top-right" richColors />

      <Routes>
        {/* Your regular routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes with their own layout */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="blog-list" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
