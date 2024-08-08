import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: { type: String },
  },

  { timestamps: true }
);

export default mongoose.model('User', userSchema);
