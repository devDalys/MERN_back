import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema(
  {
    imageUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    }
  },
  {
    timestamps: true,
  });

export const PostsSchema = mongoose.model('posts', postsSchema)
