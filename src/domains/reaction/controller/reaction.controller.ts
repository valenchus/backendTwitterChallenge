import { db } from "@utils";
import { Router, Response, Request } from "express";
import { ReactionRepositoryImpl } from "../repository/reaction.repository.impl";
import { ReactionService } from "../service/reaction.service";
import { ReactionServiceImpl } from "../service/reaction.service.impl";
import HttpStatus from 'http-status';

export const reactionRouter = Router();

const service: ReactionService = new ReactionServiceImpl(new ReactionRepositoryImpl(db));

reactionRouter.post('/:postId', async (req: Request, res: Response) => {
    const { userId } = res.locals.context;
    const { postId } = req.params;
    const { type } = req.query;

    const post = await service.create(userId, postId, type as String);
    return res.status(HttpStatus.OK).json(post);
});

reactionRouter.delete('/postId', async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { type } = req.query;
    await service.delete(postId, type as String);
    return res.status(HttpStatus.OK).json({
        message: `${type} from the post: ${postId} deleted`
    });
});
