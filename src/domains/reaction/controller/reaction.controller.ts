import { db } from "@utils";
import { Router, Response, Request } from "express";
import HttpStatus from 'http-status';
import { ReactionRepositoryImpl } from "../repository/reaction.repository.impl";
import { ReactionService } from "../service/reaction.service";
import { ReactionServiceImpl } from "../service/reaction.service.impls";

export const reactionRouter = Router();

const service: ReactionService = new ReactionServiceImpl(new ReactionRepositoryImpl(db));

reactionRouter.post('/:postId', async (req: Request, res: Response) => {
    const { userId } = res.locals.context;
    const { postId } = req.params;
    const { type } = req.query;

    const reaction = await service.createReactionPost(userId, postId, type as string);
    return res.status(HttpStatus.OK).json(reaction);
});

// reactionRouter.delete('/postId', async (req: Request, res: Response) => {
//     const { postId } = req.params;
//     const { type } = req.query;
//     await service.delete(postId, type as String);
//     return res.status(HttpStatus.OK).json({
//         message: `${type} from the post: ${postId} deleted`
//     });
// });
