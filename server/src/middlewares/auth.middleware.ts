import jwt from "jsonwebtoken";
import config from "../config";
import { NextFunction, Response, Request } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "Authorization Denied" });

    const payload: jwt.JwtPayload = jwt.verify(
      token,
      config.ENV.TOKEN_SECRET
    ) as jwt.JwtPayload;

    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default auth;
