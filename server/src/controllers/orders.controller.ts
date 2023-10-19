import Order from '../models/order.model';
import Menu from '../models/menu.model';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';
import { TProduct, Menu_Element } from '../../types';

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('menu_elements.element')
      .populate('products.element')
      .populate('user');
    res.json(orders);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req: Request, res: Response) => {
  let total = 0;
  let table!: number;
  let room!: number;
  let menu_elements!: Menu_Element[];
  let products!: TProduct[];

  try {
    const { order_type } = req.body;

    if (req.body?.table) {
      table = req.body?.table;
    }

    if (req.body?.room) {
      room = req.body?.room;
    }

    if (req.body?.menu_elements) {
      menu_elements = req.body?.menu_elements;
      for (const menu_element of menu_elements) {
        const menuElement = await Menu.findById(menu_element.element);
        total += menuElement!.price * menu_element.amount;
      }
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
        total += productDB!.price * product.amount;
      }
    }

    const newOrder = new Order({
      table,
      room,
      order_type,
      menu_elements,
      products,
      total,
      status: 'Pendiente',
      user: req.user.id,
    });
    const orderSaved = await newOrder.save();

    if (orderSaved) {
      const newTransaction = new Transaction({
        type: 'Venta',
        description: `Orden de ${order_type}`,
        total,
        user: req.user.id,
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
      .populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderUpdated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(orderUpdated);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder)
      return res.status(404).json({ message: 'Order not found' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const finishOrder = async (req: Request, res: Response) => {
  try {
    const { paymethod } = req.body;
    const status = 'Completada';
    const orderCompleted = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymethod },
      { new: true }
    );
    return res.json(orderCompleted);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  finishOrder,
};
