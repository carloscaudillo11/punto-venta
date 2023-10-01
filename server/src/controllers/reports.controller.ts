import { Request, Response } from "express";

export const Bill = async (req: Request, res: Response) => {
  const { id } = req.body;
  // Aqui va el codigo que impime el ticket necesitamos la impresora termica. 
};
