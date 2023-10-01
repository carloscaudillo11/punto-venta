import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';

const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transaction = await Transaction.find();
    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, description, total } = req.body;
    const newTransaction = new Transaction({
      type,
      description,
      total,
    });
    const transactionSaved = await newTransaction.save();
    return res.json(transactionSaved);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: 'transaction not found' });
    return res.json(transaction);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedTransaction);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction)
      return res.status(404).json({ message: 'Transaction not found' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export {
  getTransactions,
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
