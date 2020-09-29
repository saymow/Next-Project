import { getRepository } from 'typeorm';
import argon2 from 'argon2';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import { TOKEN_SECRET } from '../constants';
import AppError from '../errors/AppError';

interface Req {
  emailOrUsername: string;
  password: string;
}

export default class AuthenticateUser {
  public async execute({ emailOrUsername, password }: Req) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      select: [
        'id',
        'email',
        'username',
        'password',
        'created_at',
        'updated_at',
      ],
      where: emailOrUsername.includes('@')
        ? {
            email: emailOrUsername,
          }
        : {
            username: emailOrUsername,
          },
    });

    if (!user) throw new AppError('Invalid crendentials', 401);

    const passwordMatched = await argon2.verify(user.password, password);

    if (!passwordMatched) throw new AppError('Invalid credentials', 401);

    const token = sign({}, TOKEN_SECRET, {
      subject: user.id,
      expiresIn: '3d',
    });

    return {
      user: {
        ...user,
        token,
      },
    };
  }
}
