import Order from '../models/order.model';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';
import { TProduct } from '../../types';
import printerTicket from '../libs/printTicket';

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('products.element')
      .populate('box');
    res.json(orders);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getOrdersByBox = async (req: Request, res: Response) => {
  try {
    const box = req.params.id;
    const orders = await Order.find({ box })
      .populate('products.element')
      .populate('box');
    res.json(orders);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
}

const createOrder = async (req: Request, res: Response) => {
  let table!: number;
  let products!: TProduct[];

  try {
    const { total, box, paymethod } = req.body;

    if (req.body?.table) {
      table = req.body?.table;
    }

    if (req.body?.products) {
      products = req.body?.products;
      for (const product of products) {
        const productDB = await Product.findById(product.element);
        if (product.amount > productDB!.amount) {
          return res.status(400).json({
            mensaje: `No hay suficiente cantidad de ${
              productDB!.name
            } disponible para la orden`,
          });
        }
        const newAmount = productDB!.amount - product.amount;
        await Product.findByIdAndUpdate(product.element, { amount: newAmount });
      }
    }

    const newOrder = new Order({
      table,
      products,
      total,
      paymethod,
      box,
      user: req.user.id,
    });
    const orderSaved = await newOrder.save();
    if (orderSaved) {
      const newTransaction = new Transaction({
        type: 'Venta',
        description: `Venta del pedido ${orderSaved._id}`,
        date: orderSaved?.date,
        total: total,
        box,
        user: req.user.id,
      });
      await newTransaction.save();
      printerTicket();
    }

    return res.json(orderSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.element')
      .populate('box');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};


export {
  getOrders,
  createOrder,
  getOrder,
  getOrdersByBox
};
