import mongoose from 'mongoose';
import { IBox } from '../../types';

const boxSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

export default mongoose.model<IBox>('Box', boxSchema);
