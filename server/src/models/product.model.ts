import mongoose from 'mongoose';
import { IProduct } from '../../types';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: Number,
    provider: {
      type: mongoose.Types.ObjectId,
      ref: 'Provider',
    },
    amount: Number,
    image: {
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', productSchema);
