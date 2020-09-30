import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import User from '../models/User';
import SendEmailService from './SendEmailService';
import { RECOVER_PASS_SECRET, WEB_URL } from '../constants';

class SendForgotPasswordEmail {
  public async execute(email: string) {
    const usersRepository = getRepository(User);
    const sendEmailService = new SendEmailService();

    const user = await usersRepository.findOne({ where: { email } });

    if (!user)
      throw new AppError('Email not in use, try out create your account!');

    const token = sign({}, RECOVER_PASS_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    await sendEmailService.execute({
      to: email,
      subject: 'Recover password',
      html:
        "<p>It's look like you are trying to recover your account</p>" +
        `<br/> <a href='${WEB_URL}/recover-password/${token}'>Click here to setup a new password!</a>`,
    });
  }
}

export default SendForgotPasswordEmail;
