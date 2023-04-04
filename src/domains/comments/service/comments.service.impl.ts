import { CommentRepository } from '../repository/comment.repository';
import { CommentService } from './comments.service';

export class CommentServiceImpl implements CommentService {
  constructor(private readonly repository: CommentRepository) {}

  async createComment(userId: string, postId: string, content: string): Promise<void> {
      await this.repository.createComment(userId, postId, content);
  }

}
