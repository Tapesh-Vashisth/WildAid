export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const questionSchema = new Schema({
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
        required: false
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
        },
        likes: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    tags: {
        type: [String],
        required: true,
        default: []
    }
})

export default mongoose.model('Question', questionSchema)