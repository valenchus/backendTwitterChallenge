import { ReactionDTO } from '../dto';

export interface ReactionRepository {
  createReactionPost(userId: string, postId: string, content: string): Promise<ReactionDTO>;
}