import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import 'express-async-errors';

import { db, BodyValidation } from '@utils';
import { UserRepositoryImpl } from '@domains/user/repository';

import { AuthService, AuthServiceImpl } from '../service';
import { LoginInputDTO, SignupInputDTO } from '../dto';
import { generateImageURL } from '@utils/s3Provider';

export const authRouter = Router();

// Use dependency injection
const service: AuthService = new AuthServiceImpl(new UserRepositoryImpl(db));

authRouter.post('/signup', BodyValidation(SignupInputDTO), async (req: Request, res: Response) => {
  const data = req.body;

  const { token, user } = await service.signup(data);
  const imageUrl = await generateImageURL(user.userId, 'jpeg');

  return res.status(HttpStatus.CREATED).json({ token, imageUrl, user });
});

authRouter.post('/login', BodyValidation(LoginInputDTO), async (req: Request, res: Response) => {
  const data = req.body;

  const token = await service.login(data);

  return res.status(HttpStatus.OK).json(token);
});
