import Order from '../models/order.model';
import Menu from '../models/menu.model';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';
import { TProduct, Menu_Element } from '../../types';

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('products')
      .populate('menu_elements')
      .populate('user');
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error });
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
      menu_elements.forEach(async (menu_element) => {
        const menuElement = await Menu.findById(menu_element.id);
        total += menuElement!.price * menu_element.amount;
      });
    }

    if (req.body?.products) {
      products = req.body?.products;
      products.forEach(async (product) => {
        const pro = await Product.findById(product.id);
        if (product.amount > pro!.amount) {
          return res.status(400).json({
            mensaje: `No hay suficiente cantidad de ${
              pro!.name
            } disponible para la orden`,
          });
        }
        const newAmount = pro!.amount - product.amount;
        await Product.findByIdAndUpdate(product.id, { amount: newAmount });
        total += pro!.price * product.amount;
      });
    }

    const newTransaction = new Transaction({
      type: 'Venta',
      description: `Orden de ${order_type}`,
      total,
    });
    await newTransaction.save();

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
    return res.json(orderSaved);
  } catch (error) {
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
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
