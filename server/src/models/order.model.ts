import mongoose from "mongoose";
import { IOrder } from "../../types";

const orderSchema = new mongoose.Schema(
  {
    table: {
      type: Number,
      trim: true,
    },
    room: {
      type: Number,
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
    menu_elements: {
      type: [mongoose.Types.ObjectId],
      ref: "Menu",
    },
    products: {
      type: [mongoose.Types.ObjectId],
      ref: "Product",
    },
    total: {
      type: Number,
      required: true,
    },
    paymethod: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", orderSchema);
