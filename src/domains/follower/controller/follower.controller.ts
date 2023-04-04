import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import "express-async-errors";

import { db, BodyValidation } from '@utils';
import { FollowerService } from '../service/follower.service';
import { FollowerServiceImpl } from '../service/follower.service.impl';
import { FollowerRepositoryImpl } from '../repository';

export const followerRouter = Router();

// Use dependency injection
const service: FollowerService = new FollowerServiceImpl(new FollowerRepositoryImpl(db));

followerRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  console.log({userId});
  return res.send("working")
//   return res.status(HttpStatus.OK).json(users);
});

followerRouter.post('/follow/:user_id', async (req: Request, res: Response) => {
    const { userId } = res.locals.context;
    const { user_id } = req.params;
    await service.followUser(userId, user_id);
    return res.status(200).json({
        message: "user followed"
    });
} )


followerRouter.delete('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;

//   await service.deleteUser(userId);

  return res.status(HttpStatus.OK);
});
