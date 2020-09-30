import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import argon2 from 'argon2';
import { RECOVER_PASS_SECRET } from '../constants';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Req {
  password: string;
  token: string;
}

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class ForgotPassword {
  public async execute({ password, token }: Req) {
    try {
      const usersRepository = getRepository(User);

      const decoded = verify(token, RECOVER_PASS_SECRET);

      const { sub: id } = decoded as tokenPayload;

      const user = await usersRepository.findOne(id);

      if (!user) throw new AppError('This account was deleted.');

      const hashedPass = await argon2.hash(password);

      user.password = hashedPass;

      await usersRepository.save(user);
    } catch (err) {
      throw new AppError(err.message || 'invalid token');
    }
  }
}

export default ForgotPassword;
