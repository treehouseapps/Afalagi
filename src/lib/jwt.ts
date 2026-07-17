import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export function createToken(payload: object) {
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}
