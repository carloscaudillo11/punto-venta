import config from "../config";
import jwt from "jsonwebtoken";

export const createAccessToken = (payload: Object) => {
  try {
    const token = jwt.sign(payload, config.ENV.TOKEN_SECRET, { expiresIn: "2d" });
    return token;
  } catch (error) {
    console.log(error)
  }
};
