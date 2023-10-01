import mongoose from 'mongoose';
import { IMenu } from '../../types';

const menuSchema = new mongoose.Schema(
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
    category_Menu: {
      type: String,
      required: true,
    },
    price: Number,
    image: {
      url: String,
      public_id: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMenu>('Menu', menuSchema);
