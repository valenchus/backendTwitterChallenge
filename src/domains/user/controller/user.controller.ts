import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import "express-async-errors";

import { db } from '@utils';

import { UserRepositoryImpl } from '../repository';
import { UserService, UserServiceImpl } from '../service';

export const userRouter = Router();

// Use dependency injection
const service: UserService = new UserServiceImpl(new UserRepositoryImpl(db));

userRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { limit, skip } = req.query as Record<string, string>;

  const users = await service.getUserRecommendations(userId, { limit: Number(limit), skip: Number(skip) });

  return res.status(HttpStatus.OK).json(users);
});

userRouter.get('/me', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;

  const user = await service.getUser(userId);

  return res.status(HttpStatus.OK).json(user);
});

userRouter.get('/:userId', async (req: Request, res: Response) => {
  const { userId: otherUserId } = req.params;

  const user = await service.getUser(otherUserId);

  return res.status(HttpStatus.OK).json(user);
});

userRouter.delete('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;

  await service.deleteUser(userId);

  return res.status(HttpStatus.OK);
});
userRouter.put('/setPrivacy', async(req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const {isPrivate} = req.body;
  await service.setPrivacySettings(userId, isPrivate);
  return res.status(HttpStatus.OK).json({message: "You have succesfuly changed your privacy settings!"});
})
userRouter.get('/retweetsByUser/:userId', async(req: Request, res: Response) => {
  const { userId } = req.params;
  const retweets = await service.retweetsByUser(userId);
  return res.status(HttpStatus.OK).json(retweets);
})
// /user/userid/retweets
userRouter.get('/likesByUser/:userId', async(req: Request, res: Response) => {
  const { userId } = req.params;
  const likes = await service.tweetsLikedByUser(userId);
  return res.status(HttpStatus.OK).json(likes);
})
userRouter.get('/commentsByUser/:userId', async(req: Request, res: Response) => {
  const { userId } = req.params;
  const comments = await service.commentsByUser(userId);
  return res.status(HttpStatus.OK).json(comments);
})