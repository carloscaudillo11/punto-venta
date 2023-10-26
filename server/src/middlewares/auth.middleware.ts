import config from "../config";
import { getToken } from "next-auth/jwt"
import { NextFunction, Response, Request } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await getToken({ req, secret: config.ENV.TOKEN_SECRET });
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default auth;
