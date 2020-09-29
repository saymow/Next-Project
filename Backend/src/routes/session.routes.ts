import { Router } from 'express';

import AuthenticateUser from '../services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const authenticateUser = new AuthenticateUser();

  const user = await authenticateUser.execute({ emailOrUsername, password });

  return res.send(user);
});

export default routes;
