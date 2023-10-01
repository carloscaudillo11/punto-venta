import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { createAccessToken } from "../libs/jwt";
import { IUser } from "../../types";

const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, password, key, rol } = req.body;

    const userFound = await User.findOne({ key });

    if (userFound)
      return res.status(400).json({ message: "The key is already in use" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: IUser = new User({
      name: name,
      lastname: lastname,
      key: key,
      password: passwordHash,
      rol: rol,
    });
    const userSaved = await newUser.save();

    const token = createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      key: userSaved.key,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { key, password } = req.body;
    const userFound = await User.findOne({ key });

    if (!userFound)
      return res.status(400).json({
        message: "The key does not exist",
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "The password is incorrect",
      });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      name: userFound.name,
      key: userFound.key,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  return res.send("logout succesfull");
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send(false);
    const payload: jwt.JwtPayload = jwt.verify(
      token,
      config.ENV.TOKEN_SECRET
    ) as jwt.JwtPayload;

    const userFound = await User.findById(payload.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      name: userFound.name,
      key: userFound.key,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { register, login, logout, verifyToken };
