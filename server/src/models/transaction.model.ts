import mongoose from 'mongoose';
import { ITransactions } from '../../types';

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    total: Number,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITransactions>('Transactions', transactionSchema);
