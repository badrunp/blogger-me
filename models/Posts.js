import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
})


export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);