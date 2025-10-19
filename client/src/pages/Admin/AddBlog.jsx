import { useState, useRef, useEffect } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [featuredImage, setFeaturedImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);
  const [currentText, setCurrentText] = useState("Initializing AI engine");

  // Enhanced text progression for more interactive feel
  const progressTexts = [
    "Initializing AI engine",
    "Analyzing your topic",
    "Researching relevant content",
    "Structuring the article",
    "Generating engaging content",
    "Adding creative elements",
    "Polishing the writing",
    "Finalizing your masterpiece",
  ];

  const typeContent = (content, speed = 5) => {
    return new Promise((resolve) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText;
      const totalLength = textContent.length;

      let currentIndex = 0;
      let textIndex = 0;

      const interval = setInterval(() => {
        currentIndex += Math.floor(Math.random() * 4) + 2; // Faster increment

        const progress = Math.floor((currentIndex / totalLength) * 100);

        // Update text based on progress with smoother transitions
        const newTextIndex = Math.min(
          Math.floor((progress / 100) * progressTexts.length),
          progressTexts.length - 1
        );

        if (newTextIndex !== textIndex) {
          textIndex = newTextIndex;
          setCurrentText(progressTexts[textIndex]);
        }

        if (currentIndex >= totalLength) {
          currentIndex = totalLength;
          setTypingProgress(100);
          setCurrentText("Content generated successfully!");
          clearInterval(interval);
          setTimeout(() => {
            quillRef.current.root.innerHTML = content;
            resolve();
          }, 300);
        } else {
          setTypingProgress(progress);
        }
      }, speed);
    });
  };

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      setTypingProgress(0);
      setCurrentText(progressTexts[0]);
      console.log("Sending request with title:", title);

      const { data } = await axios.post("/api/v1/blog/generate", {
        prompt: title,
      });

      console.log("Response:", data);

      if (data.success) {
        const content = data.data.content;
        console.log("Content to parse:", content);
        console.log("Content type:", typeof content);

        // Make sure content is a string before parsing
        if (typeof content === "string") {
          const parsedContent = parse(content);
          await typeContent(parsedContent);
        } else {
          console.error("Content is not a string:", content);
          toast.error("Invalid content format received");
        }
      } else {
        toast.error(data.message || "Failed to generate content");
      }
    } catch (error) {
      console.error("Generate content error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate content"
      );
    } finally {
      setLoading(false);
      setTypingProgress(0);
      setCurrentText("Initializing AI engine");
    }
  };

  // ...existing onSubmitHandler and useEffect code...
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!featuredImage) {
      toast.error("Please select a featured image");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!subTitle.trim()) {
      toast.error("Please enter a subtitle");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsAdding(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("subTitle", subTitle.trim());
      formData.append("description", quillRef.current.root.innerHTML);
      formData.append("category", category);
      formData.append("isPublished", isPublished.toString());
      formData.append("featuredImage", featuredImage);

      const { data } = await axios.post("/api/v1/blog/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Blog added successfully!");
        setFeaturedImage(false);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        setIsPublished(false);
      } else {
        toast.error(data.message || "Failed to add blog");
      }
    } catch (error) {
      console.error("Add blog error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to add blog"
      );
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/40 h-full overflow-y-auto">
      <div className="w-full max-w-6xl px-6 py-16 mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              Create New Post
            </h1>
          </div>
          <p className="text-slate-600 text-lg ml-5">
            Craft and publish engaging content for your audience
          </p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden backdrop-blur-sm"
        >
          <div className="p-10 space-y-8">
            {/* ...existing featuredImage, title, subTitle sections... */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Featured Image *
              </label>
              <label htmlFor="featuredImage" className="block group">
                <div
                  className={`relative h-64 w-full rounded-xl border-2 border-dashed overflow-hidden cursor-pointer transition-all duration-300 ${
                    featuredImage
                      ? "border-emerald-400 bg-emerald-50/30 shadow-lg shadow-emerald-100"
                      : "border-amber-300 bg-gradient-to-br from-amber-50/80 to-orange-50/80 hover:border-orange-400 hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  {!featuredImage ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-orange-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-slate-700 font-medium mb-1">
                          Drop your image here or click to browse
                        </p>
                        <p className="text-xs text-slate-500">
                          PNG, JPG, GIF up to 10MB • Recommended: 1200x630px
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={URL.createObjectURL(featuredImage)}
                        alt="Featured"
                        className="h-full w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-medium">
                            Click to change image
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                <input
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                  type="file"
                  id="featuredImage"
                  hidden
                  accept="image/*"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>Title</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter a compelling title that captures attention"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900 placeholder-slate-400 transition-all duration-200 bg-slate-50/50 hover:border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>Subtitle</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                onChange={(e) => setSubTitle(e.target.value)}
                value={subTitle}
                type="text"
                placeholder="Add a brief description to complement your title"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900 placeholder-slate-400 transition-all duration-200 bg-slate-50/50 hover:border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>Content</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div
                  ref={editorRef}
                  className={`min-h-[24rem] border-2 border-slate-200 rounded-xl bg-slate-50/50 focus-within:ring-4 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all duration-200 ${
                    loading ? "opacity-50" : ""
                  }`}
                ></div>

                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50/98 via-orange-50/98 to-amber-50/98 backdrop-blur-md rounded-lg border border-orange-200/50 shadow-lg">
                    <div className="text-center max-w-sm px-6">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                        {/* removing the bulb for now */}
                        {/* <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg animate-bounce">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-white animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div> */}
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1">
                          AI Content Generation
                        </h3>
                        <p className="text-sm text-slate-600 min-h-[20px] transition-all duration-300">
                          {currentText}
                          <span className="inline-flex ml-1">
                            <span className="animate-[bounce_0.8s_ease-in-out_infinite_0ms]">
                              .
                            </span>
                            <span className="animate-[bounce_0.8s_ease-in-out_infinite_150ms]">
                              .
                            </span>
                            <span className="animate-[bounce_0.8s_ease-in-out_infinite_300ms]">
                              .
                            </span>
                          </span>
                        </p>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-full transition-all duration-200 ease-out relative overflow-hidden"
                          style={{ width: `${typingProgress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-slate-600">
                        {typingProgress}% complete
                      </p>

                      <div className="mt-4 flex items-center justify-center gap-1.5">
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.15s]"></div>
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-[pulse_1s_ease-in-out_infinite_0.3s]"></div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  disabled={loading}
                  type="button"
                  onClick={generateContent}
                  className={`absolute bottom-5 right-5 text-sm font-semibold transition-all px-6 py-3 rounded-xl flex items-center gap-2.5 min-w-[180px] justify-center group shadow-lg ${
                    loading
                      ? "text-orange-600 bg-orange-50 border-2 border-orange-200 cursor-not-allowed"
                      : "text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:via-orange-600 hover:to-amber-700 border-2 border-orange-400/50 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Generating</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ...existing category and publish sections... */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <span>Category</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900 bg-slate-50/50 transition-all duration-200 cursor-pointer appearance-none pr-12 font-medium hover:border-slate-300"
                >
                  <option value="">Select a category</option>
                  {blogCategories.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t-2 border-slate-100">
              <div className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  id="publish-toggle"
                  checked={isPublished}
                  className="w-5 h-5 rounded-lg border-2 border-slate-300 text-orange-600 focus:ring-4 focus:ring-orange-500/20 cursor-pointer transition-all"
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <label
                  htmlFor="publish-toggle"
                  className="text-sm font-semibold text-slate-700 cursor-pointer group-hover:text-slate-900 transition-colors flex items-center gap-2"
                >
                  <span>Publish immediately</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </label>
              </div>
              {isPublished && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  Will be published
                </span>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 px-10 py-6 border-t-2 border-slate-100 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              <span className="text-rose-500 font-semibold">*</span> Required
              fields
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow active:scale-95"
              >
                Save Draft
              </button>
              <button
                disabled={isAdding}
                type="submit"
                className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 rounded-xl hover:from-orange-700 hover:via-orange-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                {isAdding ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Blog</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
