import { CommentDTO } from "../dto";

export interface CommentService {
  createComment(userId: string, postId: string, content: string): Promise<void>;
}
