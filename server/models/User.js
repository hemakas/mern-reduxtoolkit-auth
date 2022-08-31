import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: Number, default: 3 },
    googleId: { type: String, required: false }
}, { timestamps: true })

export default mongoose.model('User', userSchema)