import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  }
},{
  timestamps: true
})


export default mongoose.model('users', usersSchema);
