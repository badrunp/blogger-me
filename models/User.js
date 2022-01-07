import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

export default mongoose.models.users || mongoose.model('users', userSchema)