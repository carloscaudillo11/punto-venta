import mongoose from 'mongoose';
import { IOrder } from '../../types';

const orderSchema = new mongoose.Schema(
  {
    table: Number,
    room: Number,
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    order_type: {
      type: String,
      required: true,
    },
    menu_elements: [
      {
        element: {
          type: mongoose.Types.ObjectId,
          ref: 'Menu',
        },
        amount: Number,
      },
    ],
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', orderSchema);
