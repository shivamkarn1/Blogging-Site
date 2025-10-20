import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Blog ID is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
