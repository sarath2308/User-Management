import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: '' // or a default avatar URL if needed
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
  isDeleted:{
    type:Boolean,
    default:false,
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

export default mongoose.model('User', userSchema);