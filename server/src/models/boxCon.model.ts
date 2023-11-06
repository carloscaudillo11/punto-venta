import mongoose from 'mongoose';
import { IBoxCon } from '../../types';

const boxConSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    startingAmount: Number,
    finalAmount: Number,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
    },
    box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBoxCon>('BoxCon', boxConSchema);
