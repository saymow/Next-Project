import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../constants';
import AppError from '../errors/AppError';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const Authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error();

    const parts = authorization?.split(' ');

    if (parts.length !== 2) throw new Error();

    const [prefix, token] = parts;

    if (prefix !== 'Bearer') throw new Error();

    const decoded = verify(token, TOKEN_SECRET) as tokenPayload;

    const { sub: id } = decoded;

    req.user = { id };

    return next();
  } catch (err) {
    throw new AppError('Unathourized', 401);
  }
};

export default Authenticate;
