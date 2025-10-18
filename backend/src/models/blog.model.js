import mongoose,{Schema} from 'mongoose';

const blogSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        subTitle:{
            type:String,
        },
        description:{
            type:String,required:true
        },
        category:{
            type:String,
            required:true
        },
        featuredImage:{
            type:String
        },
        isPublished:{
            type:Boolean,
            required:true
        }
    },
    {timestamps:true}
)

export const Blog = mongoose.model("Blog",blogSchema)

