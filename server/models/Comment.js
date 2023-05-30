import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]

})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;