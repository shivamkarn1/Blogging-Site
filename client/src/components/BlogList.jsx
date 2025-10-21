import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, input } = useAppContext();

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/blog/all");

      if (data.success) {
        setBlogs(data.data || []);
      } else {
        console.error("Failed to fetch blogs:", data.message);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = () => {
    let filtered = blogs;

    // Filter by search input
    if (input && input.trim() !== "") {
      const searchTerm = input.toLowerCase().trim();
      console.log("Searching for:", searchTerm);
      filtered = filtered.filter((blog) => {
        const matchesTitle = blog.title.toLowerCase().includes(searchTerm);
        const matchesCategory = blog.category
          .toLowerCase()
          .includes(searchTerm);
        const matchesSubTitle =
          blog.subTitle && blog.subTitle.toLowerCase().includes(searchTerm);

        const matches = matchesTitle || matchesCategory || matchesSubTitle;

        if (matches) {
          console.log("Match found:", blog.title);
        }

        return matches;
      });
      console.log("Filtered results:", filtered.length);
    }

    // Filter by category
    if (menu !== "All") {
      filtered = filtered.filter((blog) => blog.category === menu);
    }

    return filtered;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center font-semibold gap-4 sm:gap-8 my-10 relative text-orange-800">
        {blogCategories.map((item, index) => (
          <motion.div
            key={item}
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -3 }}
          >
            <button
              onClick={() => setMenu(item)}
              className="relative cursor-pointer z-10"
            >
              <motion.span
                className={`relative block px-4 py-1 font-semibold ${
                  menu === item ? "text-white" : "text-amber-500"
                }`}
                animate={{
                  scale: menu === item ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
              >
                {item}
              </motion.span>

              {menu === item && (
                <>
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 -z-20 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full blur-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1.3,
                      opacity: 0.5,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                  <motion.div
                    className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                  />
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center text-gray-600 mt-8"
      >
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {input && input.trim() !== "" ? (
            <>
              Search results for:{" "}
              <span className="font-bold text-orange-600">"{input}"</span>
              {menu !== "All" && (
                <span>
                  {" "}
                  in <span className="font-bold text-orange-600">{menu}</span>
                </span>
              )}
            </>
          ) : (
            <>
              Showing: <span className="font-bold text-orange-600">{menu}</span>
            </>
          )}
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {filteredBlogs().length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found</p>
          <p className="text-gray-400 text-sm mt-2">
            {input
              ? "Try adjusting your search terms"
              : "Check back later for new content"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
