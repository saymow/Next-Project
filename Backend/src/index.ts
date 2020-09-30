import 'reflect-metadata';
import './database';

import express, { Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, _) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      status: 'Error',
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).send({
    error: 'Error',
    message: 'Internal server error.',
  });
});

app.listen(PORT, () => console.log('Server is up on', PORT));
