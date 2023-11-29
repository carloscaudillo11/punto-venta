import mongoose from 'mongoose';
import { IProvider } from '../../types';

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      email: String,
      phone: Number,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProvider>('Provider', providerSchema);
