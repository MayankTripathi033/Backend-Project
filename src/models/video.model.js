import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new mongoose.Schema({
    videoFile: {  
        type: String, //Cloudinary url
        required: true,
    },
    thumbnail: {
        type: String, //Clodinary url
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
},{timestamps: true})

VideoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", VideoSchema)