import { Request, Response } from 'express';

export const Bill = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    // Aqui va el codigo que impime el ticket necesitamos la impresora termica.
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
