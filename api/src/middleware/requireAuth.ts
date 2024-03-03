import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
  user?: string | object;
}

export const requireAuth = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;
  } catch (err) {
    console.error('error with decoding payload', err);
    return res.status(401).send('Invalid Token');
  }

  return next();
};

export const requireAuthSocket = (token: string) => {
  if (!token) {
    return false;
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
    return true;
  } catch (err) {
    console.error('error with token', token);
    throw Error;
  }
};
