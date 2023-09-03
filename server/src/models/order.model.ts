import mongoose from "mongoose";
import { IOrder } from "../../types";

const orderSchema = new mongoose.Schema(
  {
    table: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    order_type: {
      type: String,
      required: true,
    },
    details: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
    },
    status: {
      type: String,
      required: true,
    },
    total: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", orderSchema);
