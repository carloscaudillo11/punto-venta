import config from "../config";
import jwt from "jsonwebtoken";

export const createAccessToken = async (payload: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.ENV.TOKEN_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
