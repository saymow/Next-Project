import { getRepository } from 'typeorm';
import argon2 from 'argon2';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Req {
  username: string;
  email: string;
  password: string;
}

class CreateUser {
  public async execute({ email, username, password }: Req) {
    const usersRepository = getRepository(User);

    try {
      const hashedPass = await argon2.hash(password);

      const user = usersRepository.create({
        email,
        username,
        password: hashedPass,
      });

      await usersRepository.save(user);

      delete user.password;

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new AppError('Email or username already taken.');
      } else {
        throw new Error('Unexpected error on register.');
      }
    }
  }
}

export default CreateUser;
