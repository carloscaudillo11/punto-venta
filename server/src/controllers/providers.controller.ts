import { Request, Response } from 'express';
import Provider from '../models/provider.model';

const getProviders = async (_req: Request, res: Response) => {
  try {
    const providers = await Provider.find();
    return res.json(providers);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createProvider = async (req: Request, res: Response) => {
  try {
    const { name, lastname, nif_rif, address, contact, status } = req.body;

    const newProvider = new Provider({
      name,
      lastname,
      nif_rif,
      address,
      contact,
      status,
    });

    const providerSaved = await newProvider.save();
    return res.json(providerSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getProvider = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider)
      return res.status(404).json({ message: 'Provider not found' });

    return res.json(provider);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateProvider = async (req: Request, res: Response) => {
  try {
    const updatedProvider = await Provider.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedProvider);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteProvider = async (req: Request, res: Response) => {
  try {
    const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
    if (!deletedProvider)
      return res.status(404).json({ message: 'Provider not found' });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  createProvider,
  deleteProvider,
  getProviders,
  getProvider,
  updateProvider,
};
