import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não forneceido." });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token mal formatado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`) as JwtPayload;
    // (req as any).decodedToken = decoded;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(403)
        .json({ message: "Token inválido ou expirado.", error: error.message });
    }
  }
}
