import { ReactionDTO } from "../dto";

export interface ReactionService {
  createReactionPost(userId: string, postId: string, type: string): Promise<void>;
}
