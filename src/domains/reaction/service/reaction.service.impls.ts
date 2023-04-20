import { ReactionDTO } from '../dto';
import { ReactionRepository } from '../repository/reaction.repository';
import { ReactionService } from './reaction.service';

export class ReactionServiceImpl implements ReactionService {
  constructor(private readonly repository: ReactionRepository) {}

  async createReactionPost(userId: string, postId: string, content: string): Promise<void> {
      await this.repository.createReactionPost(userId, postId, content);
  }

}
