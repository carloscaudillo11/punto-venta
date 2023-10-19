import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { IUser } from '../../types';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastname, password, email, rol } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({ message: 'The user is already in use' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: IUser = new User({
      name: name,
      lastname: lastname,
      email: email,
      password: passwordHash,
      rol: rol,
    });
    const userSaved = await newUser.save();

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastname: userSaved.lastname,
      email: userSaved.email,
      rol: userSaved.rol,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: 'The email does not exist',
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'The password is incorrect',
      });
    }

    res.json({
      id: userFound._id,
      name: userFound.name,
      lastname: userFound.lastname,
      email: userFound.email,
      rol: userFound.rol,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export { createUser, signin };
