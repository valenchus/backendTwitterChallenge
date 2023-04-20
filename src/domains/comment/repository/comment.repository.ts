import { CommentDTO } from '../dto';

export interface CommentRepository {
  createComment(userId: string, postId: string, content: string): Promise<CommentDTO>;
}