import { PrismaClient } from '@prisma/client';
import { ReactionDTO } from '../dto';
import { ReactionRepository } from './reaction.repository';

export class ReactionRepositoryImpl implements ReactionRepository {
  constructor(private readonly db: PrismaClient) {}

  async createReactionPost(userId: string, postId: string, type: string): Promise<ReactionDTO> {
    const reaction = await this.db.reaction.create({
      data: {
        postId,
        userId,
        type,
      },
    });

    return new ReactionDTO(reaction);
  }
}
