export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const blogSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments: [{
        author: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
})

export default mongoose.model('Blog', blogSchema)