import { Request, Response } from 'express';
import Box from '../models/box.model';

const getBoxes = async (req: Request, res: Response) => {
  try {
    const boxes = await Box.find();
    return res.json(boxes);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createBox = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const status = 'Cerrada';
    const boxExist = await Box.findOne({ name });
    if (boxExist) return res.status(400).json({ message: 'Box already exist' });
    const newBox = new Box({
      name,
      status,
    });

    const boxSaved = await newBox.save();
    return res.json(boxSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getBox = async (req: Request, res: Response) => {
  try {
    const box = await Box.findById(req.params.id);

    if (!box) return res.status(404).json({ message: 'Box not found' });

    return res.json(box);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getBoxClose = async (_req: Request, res: Response) => {
  try {
    const boxes = await Box.find({ status: 'Cerrada' });

    if (!boxes) return res.status(404).json({ message: 'Box not found' });

    return res.json(boxes);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateBox = async (req: Request, res: Response) => {
  try {
    const updatedBox = await Box.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBox) return res.status(404).json({ message: 'Box not found' });
    return res.json(updatedBox);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteBox = async (req: Request, res: Response) => {
  try {
    const box = await Box.findById(req.params.id);
    if (box?.status === 'Abierta')
      return res.status(400).json({ message: 'Box is open' });
    const deletedBox = await Box.findByIdAndDelete(req.params.id);
    if (!deletedBox) return res.status(404).json({ message: 'Box not found' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export { createBox, deleteBox, getBoxes, getBox, updateBox, getBoxClose };
