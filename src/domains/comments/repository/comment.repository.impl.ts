import { UserDTO } from '@domains/user/dto';
import { PrismaClient } from '@prisma/client';
import { CommentDTO } from '../dto';
import { CommentRepository } from './comment.repository';

export class CommentRepositoryImpl implements CommentRepository {
  constructor(private readonly db: PrismaClient) {}

  async createComment(userId: string, postId: string, content: string): Promise<CommentDTO> {
    const comment = await this.db.comment.create({
      data: {
        content,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
      include: {
        user: true,
        post: true,
      },
    });

    return {
      id: comment.id,
      content: comment.content,
      userId: comment.user.id,
      postId: comment.post.id,
    };
  }
}