import express, { Request, Response } from 'express';
import morganMiddleware from './middleware/morgan';
import tokenCheck from './middleware/tokenCheck';
import errorHandler from './middleware/errorHandler';
import HttpError from './error/HttpError';
import { login, createUser } from './user/userService';
import fetch from 'node-fetch';

const app = express();
app.use(morganMiddleware);
app.use(express.json());

app.post('/login', async (req, res, next) => {
  if (!req.body.username) {
    next(new HttpError('username field is not found or empty'));
  }

  if (!req.body.password) {
    next(new HttpError('username field is not found or empty'));
  }

  const token = await login(req.body.username, req.body.password);
  res.json({ token });
});

app.post('/user', async (req, res, next) => {
  if (!req.body.username) {
    next(new HttpError('username field is not found or empty'));
  }

  if (!req.body.password) {
    next(new HttpError('password field is not found or empty'));
  }

  const id = await createUser(req.body.username, req.body.password);
  res.json(id);
});

app.get('/breweries', tokenCheck, async (req: Request, res: Response) => {
  let uri = 'https://api.openbrewerydb.org/breweries';
  const query = req.query.query;
  if (query) {
    uri += `/search?query=${query}`;
  }
  const response = await fetch(uri);
  const data = await response.json();
  res.json(data);
});

app.use('*', (_req: Request, res: Response) => {
  res.status(404);
  res.json();
});

app.use(errorHandler);

export default app;
