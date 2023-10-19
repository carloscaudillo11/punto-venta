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
    const { type, description, total } = req.body;
    const newTransaction = new Transaction({
      type,
      description,
      total,
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

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedTransaction);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
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
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  getTransactions,
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
