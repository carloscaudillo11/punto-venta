import Order from '../models/order.model';
import Menu from '../models/menu.model';
import Product from '../models/product.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('products')
      .populate('menu_elements');
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order_type, paymethod } = req.body;

    let total = 0;
    let table!: number;
    let room!: number;
    let menu_elements!: ObjectId[];
    let products!: ObjectId[];

    if (req.body?.table) {
      table = req.body?.table;
    }

    if (req.body?.room) {
      room = req.body?.room;
    }

    if (req.body?.menu_elements) {
      menu_elements = req.body?.menu_elements;
      for (let i = 0; i < menu_elements.length; i++) {
        const menuElement = await Menu.findById(menu_elements[i]);
        total += menuElement!.price;
      }
    }

    if (req.body?.products) {
      products = req.body?.menu_elements;
      for (let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i]);
        total += product!.price;
      }
    }

    const newOrder = new Order({
      table,
      room,
      order_type,
      menu_elements,
      products,
      total,
      paymethod
    });
    const ordersaved = await newOrder.save();
    return res.json(ordersaved);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('product')
      .populate('menu_elements');
    if (!order) return res.status(404).json({ message: 'Order not found' });
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
      return res.status(404).json({ message: 'Order not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getOrders, createOrder, getOrder, updateOrder, deleteOrder };
