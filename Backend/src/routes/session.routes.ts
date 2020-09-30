import { Router } from 'express';

import AuthenticateUser from '../services/AuthenticateUserService';
import ForgotPassword from '../services/ForgotPasswordService';
import SendForgotPasswordEmail from '../services/SendForgotPasswordEmailService';

const routes = Router();

routes.post('/', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const authenticateUser = new AuthenticateUser();

  const user = await authenticateUser.execute({ emailOrUsername, password });

  return res.send(user);
});

routes.put('/recover', async (req, res) => {
  const { token, password } = req.body;
  const forgotPassword = new ForgotPassword();

  await forgotPassword.execute({ password, token });

  return res.send();
});

routes.post('/send-recover', async (req, res) => {
  const { email } = req.body;
  const sendForgotPasswordEmail = new SendForgotPasswordEmail();

  await sendForgotPasswordEmail.execute(email);

  return res.send();
});

export default routes;
