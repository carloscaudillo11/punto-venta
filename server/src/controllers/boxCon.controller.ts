import BoxCon from '../models/boxCon.model';
import Box from '../models/box.model';
import { Request, Response } from 'express';

const getBoxesOpen = async (_req: Request, res: Response) => {
  try {
    const boxes = await BoxCon.findOne({status: "Abierta"}).populate('user').populate('box');
    res.json(boxes);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const openBox = async (req: Request, res: Response) => {
  try {
    const { startingAmount, box } = req.body;
    console.log(req.body);
    const status = 'Abierta';
    const newBox = new BoxCon({
      startingAmount,
      user: req.user.id,
      status,
      box,
    });
    const boxSaved = await newBox.save();
    await Box.findByIdAndUpdate(box, { status: 'Abierta' }, { new: true });
    return res.json(boxSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const closeBox = async (req: Request, res: Response) => {
  try {
    const { finalAmount, box } = req.body;

    const boxUpdated = await BoxCon.findByIdAndUpdate(
      box,
      { finalAmount, status: 'Cerrada' },
      { new: true }
    );
    await Box.findByIdAndUpdate(box, { status: 'Cerrada' }, { new: true });
    return res.json(boxUpdated);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export { getBoxesOpen, openBox, closeBox };
