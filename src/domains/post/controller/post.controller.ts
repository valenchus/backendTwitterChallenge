import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import 'express-async-errors';

import { db, BodyValidation } from '@utils';

import { PostRepositoryImpl } from '../repository';
import { PostService, PostServiceImpl } from '../service';
import { CreatePostInputDTO } from '../dto';

export const postRouter = Router();

// Use dependency injection
const service: PostService = new PostServiceImpl(new PostRepositoryImpl(db));

postRouter.get('/', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { limit, before, after } = req.query as Record<string, string>;

  //updated to return only posts with (public profile / following relation)
  const posts = await service.getLatestPosts(userId, { limit: Number(limit), before, after });
  return res.status(HttpStatus.OK).json(posts);
});

postRouter.get('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { postId } = req.params;

  const post = await service.getPost(userId, postId);

  return res.status(HttpStatus.OK).json(post);
});

postRouter.delete('/:postId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { postId } = req.params;
  await service.deletePost(userId, postId);
  return res.status(HttpStatus.OK).json({
    message: 'Deleted!',
  });
});

postRouter.get('/by_user/:userId', async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const { userId: authorId } = req.params;
  const { limit, before, after } = req.query as Record<string, string>;

  const isAFollower = await service.canSeePosts(userId, authorId);
  if (!isAFollower) return res.status(HttpStatus.NOT_FOUND).json({ message: 'This account is private' });

  // !isAFollower o isPrivateAccount -> devolver 404 error
  const posts = await service.getLatestPosts(userId, { limit: Number(limit), before, after }, authorId);
  console.log('posts get', posts);
  return res.status(HttpStatus.OK).json(posts);
});

postRouter.post('/', BodyValidation(CreatePostInputDTO), async (req: Request, res: Response) => {
  const { userId } = res.locals.context;
  const data = req.body;

  const post = await service.createPost(userId, data);

  return res.status(HttpStatus.CREATED).json(post);
});
