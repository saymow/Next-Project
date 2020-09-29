import { Router } from 'express';
import { getRepository } from 'typeorm';

import authenticate from '../middlewares/Authenticate';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const routes = Router();

routes.post('/', async (req, res) => {
  const { email, username, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    username,
    password,
  });

  return res.send(user);
});

routes.patch('/', authenticate, async (req, res) => {
  const { id } = req.user;
  const { username } = req.body;

  const usersRepository = getRepository(User);

  const { raw: user } = await usersRepository
    .createQueryBuilder('user')
    .update(User, { username })
    .where('id = :id', { id })
    .returning('*')
    .execute();

  return res.send(user);
});

routes.delete('/', authenticate, async (req, res) => {
  const { id } = req.user;
  const usersRepository = getRepository(User);

  await usersRepository.delete(id);

  return res.send();
});

export default routes;
