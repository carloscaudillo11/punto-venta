import Order from '../models/order.model';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';
import { TProduct, Menu_Element } from '../../types';

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('menu_elements.element')
      .populate('products.element')
      .populate('box');
    res.json(orders);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req: Request, res: Response) => {
  let table!: number;
  let room!: number;
  let menu_elements!: Menu_Element[];
  let products!: TProduct[];

  try {
    const { order_type, total, box, paymethod } = req.body;

    if (req.body?.table) {
      table = req.body?.table;
    }

    if (req.body?.room) {
      room = req.body?.room;
    }

    if (req.body?.menu_elements) menu_elements = req.body?.menu_elements;

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
      room,
      order_type,
      menu_elements,
      products,
      total,
      paymethod,
      box,
    });
    const orderSaved = await newOrder.save();
    if (orderSaved) {
      const newTransaction = new Transaction({
        type: 'Venta',
        description: `Orden de ${order_type}`,
        date: orderSaved?.date,
        total: total,
        box,
      });
      await newTransaction.save();
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
      .populate('products')
      .populate('menu_elements')
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
};
