import { ReactionRepository } from '../repository/reaction.repository';
import { ReactionService } from './reaction.service';

export class ReactionServiceImpl implements ReactionService {
  constructor(private readonly repository: ReactionRepository) {}

  async create(userId: string, postId: string, type: string): Promise<void> {
      await this.repository.create(userId, postId, type);
  }
  async delete(postId: string, type: string): Promise<void> {
      await this.repository.delete(postId, type)
  }
}