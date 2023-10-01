import ProviderOrder from '../models/providerOrder.model';
import { Request, Response } from 'express';
import { TProducts } from '../../types';
import Product from '../models/product.model';

const getProviderOrders = async (_req: Request, res: Response) => {
  try {
    const providerOrder = await ProviderOrder.find().populate('provider');
    return res.json(providerOrder);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createProviderOrder = async (req: Request, res: Response) => {
  try {
    const { order_number, date, provider, products, total } = req.body;

    let pros: TProducts[] = products;
    pros.forEach(async (product) => {
      const pro = await Product.findById(product.id);
      const newAmount = pro!.amount + product.amount;
      await Product.findByIdAndUpdate(product.id, { amount: newAmount });
    });
    const newProviderOrder = new ProviderOrder({
      order_number,
      date,
      provider,
      products,
      total,
    });
    const providerOrderSaved = await newProviderOrder.save();
    return res.json(providerOrderSaved);
  } catch (error) {
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
  }
};

export {
  getProviderOrders,
  createProviderOrder,
  getProviderOrder,
  updateProviderOrder,
  deleteProviderOrder,
};
