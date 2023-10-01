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
    nif_rif: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postal_code: String,
      country: String,
    },
    contact: {
      contact_name: String,
      contact_position: String,
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
