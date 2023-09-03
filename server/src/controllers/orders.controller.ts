import Order from "../models/order.model";
import Product from "../models/product.model";
import { Request, Response } from "express";

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { table, date, order_type, details, status } = req.body;
    let total = 0;
    if (!!details.length) {
      for (let i = 0; i < details.length; i++) {
        const products = await Product.findById(details[i]);
        total += products!.price;
      }
    }
    const newOrder = new Order({
      table,
      date,
      order_type,
      details,
      status,
      total,
    });
    const ordersaved = await newOrder.save();
    return res.json(ordersaved);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { table, date, order_type, details, status } = req.body;
    const orderUpdated = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { table, date, order_type, details, status },
      { new: true }
    );
    return res.json(orderUpdated);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getOrders, createOrder, getOrder, updateOrder, deleteOrder };
