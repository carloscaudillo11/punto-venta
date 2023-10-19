import ProviderOrder from '../models/providerOrder.model';
import { Request, Response } from 'express';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';

const getProviderOrders = async (_req: Request, res: Response) => {
  try {
    const providerOrder = await ProviderOrder.find().populate('provider');
    return res.json(providerOrder);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createProviderOrder = async (req: Request, res: Response) => {
  try {
    const { order_number, provider, products, total } = req.body;

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
    });
    const providerOrderSaved = await newProviderOrder.save();

    if (providerOrderSaved) {
      const newTransaction = new Transaction({
        type: 'Compra',
        description: `Compra a proveedor ${order_number}`,
        total,
        user: req.user.id,
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
    const providerOrder = await ProviderOrder.findById(req.params.id).populate(
      'provider'
    );
    if (!providerOrder)
      return res.status(404).json({ message: 'Provider Order not found' });
    return res.json(providerOrder);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateProviderOrder = async (req: Request, res: Response) => {
  try {
    const updatedProviderOrder = await ProviderOrder.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedProviderOrder);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteProviderOrder = async (req: Request, res: Response) => {
  try {
    const deletedProviderOrder = await ProviderOrder.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProviderOrder)
      return res.status(404).json({ message: 'Provider Order not found' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  getProviderOrders,
  createProviderOrder,
  getProviderOrder,
  updateProviderOrder,
  deleteProviderOrder,
};
