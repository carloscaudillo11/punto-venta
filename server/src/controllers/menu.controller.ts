import Menu from '../models/menu.model';
import { Request, Response } from 'express';
import { uploadMenu, deleteImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { UploadedFile } from 'express-fileupload';
import { Image } from '../../types';

const getMenu = async (_req: Request, res: Response) => {
  try {
    const menu = await Menu.find();
    return res.json(menu);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createMenuElement = async (req: Request, res: Response) => {
  try {
    const { name, description, category_Menu, price } = req.body;
    let image!: Image;
    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadMenu(file.tempFilePath);
      await fs.remove(file.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newMenuElement = new Menu({
      name,
      description,
      category_Menu,
      price,
      image,
    });
    const menuElementSaved = await newMenuElement.save();
    return res.json(menuElementSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getMenuElement = async (req: Request, res: Response) => {
  try {
    const menuElement = await Menu.findById(req.params.id);
    if (!menuElement)
      return res.status(404).json({ message: 'Menu item not found' });
    return res.json(menuElement);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateMenuElement = async (req: Request, res: Response) => {
  try {
    const menuElement = await Menu.findById(req.params.id);
    if (!menuElement)
      return res.status(404).json({ message: 'Menu item not found' });

    if (req.files?.image) {
      const file = req.files?.image as UploadedFile;
      const result = await uploadMenu(file.tempFilePath);
      await deleteImage(menuElement.image.public_id);
      await fs.remove(file.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedMenuElement = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedMenuElement);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteMenuElement = async (req: Request, res: Response) => {
  try {
    const deletedMenuElement = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenuElement)
      return res.status(404).json({ message: 'Menu item not found' });

    if (deletedMenuElement.image.public_id)
      await deleteImage(deletedMenuElement.image.public_id);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  getMenu,
  createMenuElement,
  getMenuElement,
  updateMenuElement,
  deleteMenuElement,
};
