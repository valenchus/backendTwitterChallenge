import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import "express-async-errors";

import { db } from '@utils';

import { CommentService } from '../service/comments.service';
import { CommentServiceImpl } from '../service/comments.service.impl';
import { CommentRepositoryImpl } from '../repository/comment.repository.impl';

export const commentRouter = Router();

// Use dependency injection
const service: CommentService = new CommentServiceImpl(new CommentRepositoryImpl(db));

  commentRouter.post('/:postId', async (req: Request, res:Response) => {
    const { userId } = res.locals.context;
    const { postId } = req.params;
    const { content } = req.body;
    console.log(userId);
    console.log(postId);
    console.log(content);
    await service.createComment(userId, postId, content);
    return res.status(200).json({
        message: "COMMENT CREATED!"
    });

  } );
