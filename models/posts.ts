import mongoose from 'mongoose';

const posts = new mongoose.Schema(
  {
    imageUrl: String,

  },
  {
    timestamps: true,
  });
