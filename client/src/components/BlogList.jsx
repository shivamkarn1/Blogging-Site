import { useState } from "react";
import { motion } from "framer-motion";
import { blogCategories } from "../assets/assets";

const BlogList = () => {
  const [menu , setMenu] = useState("All")

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
        key={menu}
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
          Showing: <span className="font-bold text-orange-600">{menu}</span>
        </motion.p>
        {/* Blog Cards go here */}
      </motion.div>
    </div>
  );
};

export default BlogList;