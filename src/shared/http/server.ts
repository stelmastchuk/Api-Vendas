import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
import '@shared/typeorm';
import '@shared/container/index';
import upload from '@config/upload';
import rateLimiter from '@shared/middlewares/rateLimiter';

const app = express();

app.use(cors());

app.use(express.json());

app.use(rateLimiter);
app.use('/files', express.static(upload.directory));

app.use(routes);

app.use(errors());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

app.listen(3335, () => {
  console.log('Server running!');
});
