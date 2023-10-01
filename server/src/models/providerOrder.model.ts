import mongoose from 'mongoose';
import { IOrderProvider } from '../../types';

const orderProviderSchema = new mongoose.Schema(
  {
    order_number: {
      type: Number,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    provider: {
      type: mongoose.Types.ObjectId,
      ref: 'Provider',
    },
    products: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
        },
        amount: Number,
        unit_price: Number,
      },
    ],
    total: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrderProvider>(
  'OrderProvider',
  orderProviderSchema
);
