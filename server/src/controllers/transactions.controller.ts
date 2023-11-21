import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';

const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transaction = await Transaction.find();
    return res.json(transaction);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, description, total, box } = req.body;
    const newTransaction = new Transaction({
      type,
      description,
      total,
      box,
      user: req.user.id,
    });
    const transactionSaved = await newTransaction.save();
    return res.json(transactionSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: 'transaction not found' });
    return res.json(transaction);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getSalesByBox = async (req: Request, res: Response) => {
  try {
    const box = req.params.id
    const transaction = await Transaction.find({box, type:'Venta'});
    if (!transaction)
      return res.status(404).json({ message: 'transaction not found' });
    return res.json(transaction);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};


export {
  getTransactions,
  createTransaction,
  getTransaction,
  getSalesByBox
};
