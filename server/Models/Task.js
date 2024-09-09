import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String },
    description: { type: String },
    date: { type: Date },
    important: { type: Boolean },
    completed: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
