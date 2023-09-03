import { Request, Response } from "express";

// Funciones para el modulo de proveedores necesitamos delimitar que se hara.
const createProvider = (req: Request, res: Response) => {};
const deleteProvider = (req: Request, res: Response) => {};
const getProviders = (req: Request, res: Response) => {};
const getProvider = (req: Request, res: Response) => {};
const updateProvider = (req: Request, res: Response) => {};

export {
  createProvider,
  deleteProvider,
  getProviders,
  getProvider,
  updateProvider,
};
