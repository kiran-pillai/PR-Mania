import jwt from 'jsonwebtoken';
import { Request } from 'express';

export const decodeToken = (req: Request) => {
  const token: any = req.headers['authorization']?.split(' ')[1];
  const decodedToken: any = jwt.decode(token, { complete: false });
  return decodedToken;
};
