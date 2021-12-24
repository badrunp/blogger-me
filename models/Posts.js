import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        trim: true
    },
    tags: [
        {
            type: String, 
            trim: true
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true
})


export default mongoose.models.Blogs || mongoose.model('Blogs', blogSchema);