import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: { type: String },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model('User', userSchema);
