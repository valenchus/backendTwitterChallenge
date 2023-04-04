import { UserDTO } from '@domains/user/dto';
import { CursorPagination } from '@types';
import { CreatePostInputDTO, PostDTO } from '../dto';

export interface PostRepository {
  create(userId: string, data: CreatePostInputDTO): Promise<PostDTO>;
  getAllByDatePaginated(userId: string, options: CursorPagination): Promise<PostDTO[]>;
  delete(postId: string): Promise<void>;
  getUserById(userId: any): Promise<UserDTO | null>;
  getById(postId: string, userId: string): Promise<PostDTO | null>;
  getByAuthorId(userId: string, authorId: string, options: CursorPagination): Promise<PostDTO[]>;
  canSeePosts(followerId: string, followedId: string): Promise<Boolean>;
}