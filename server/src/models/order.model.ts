import mongoose from 'mongoose';
import { IOrder } from '../../types';

const orderSchema = new mongoose.Schema(
  {
    table: Number,
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    products: [
      {
        element: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        amount: Number,
      },
    ],
    total: Number,
    paymethod: String,
    box: {
      type: mongoose.Types.ObjectId,
      ref: 'BoxCon',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', orderSchema);
