import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Content is required"],
    },
    category: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
