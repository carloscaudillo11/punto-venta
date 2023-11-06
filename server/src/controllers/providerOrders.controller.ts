import ProviderOrder from '../models/providerOrder.model';
import { Request, Response } from 'express';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';

const getProviderOrders = async (_req: Request, res: Response) => {
  try {
    const providerOrder = await ProviderOrder.find()
      .populate('provider')
      .populate('box');
    return res.json(providerOrder);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createProviderOrder = async (req: Request, res: Response) => {
  try {
    const { order_number, provider, products, total, box } = req.body;

    for (const product of products) {
      const pro = await Product.findById(product.element);
      if (!pro) {
        return res.status(400).json({
          mensaje: `El producto con ID ${product.element} no fue encontrado.`,
        });
      }
      const newAmount = pro.amount + product.amount;
      await Product.findByIdAndUpdate(product.element, { amount: newAmount });
    }

    const newProviderOrder = new ProviderOrder({
      order_number,
      provider,
      products,
      total,
      box,
    });

    const providerOrderSaved = await newProviderOrder.save();

    if (providerOrderSaved) {
      const newTransaction = new Transaction({
        type: 'Compra',
        description: `Compra de ${providerOrderSaved?.provider}`,
        date: providerOrderSaved?.date,
        total,
        box: providerOrderSaved?.box,
      });
      await newTransaction.save();
    }

    return res.json(providerOrderSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getProviderOrder = async (req: Request, res: Response) => {
  try {
    const providerOrder = await ProviderOrder.findById(req.params.id)
      .populate('provider')
      .populate('box');
    if (!providerOrder)
      return res.status(404).json({ message: 'Provider Order not found' });
    return res.json(providerOrder);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  getProviderOrders,
  createProviderOrder,
  getProviderOrder,
};
