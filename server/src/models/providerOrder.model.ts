import mongoose from 'mongoose';
import { IOrderProvider } from '../../types';

const orderProviderSchema = new mongoose.Schema(
  {
    order_number: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    provider: {
      type: mongoose.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    products: [
      {
        name: String,
        amount: Number,
        unit_price: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrderProvider>(
  'OrderProvider',
  orderProviderSchema
);
