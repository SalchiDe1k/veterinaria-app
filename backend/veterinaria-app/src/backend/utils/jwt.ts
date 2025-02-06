import jwt from "jsonwebtoken";
import { config } from "../../infrastructure/config/config";

export const generateToken = (id: string, email: string): string => {
  return jwt.sign(
    { id, email },
    config.jwt.secret as string, // 🔹 Asegurar que sea string
  );
};
