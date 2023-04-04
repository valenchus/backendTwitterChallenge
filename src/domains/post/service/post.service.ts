import { UserDTO } from '@domains/user/dto';
import { CursorPagination } from '@types';
import { CreatePostInputDTO, PostDTO } from '../dto';

export interface PostService {
  createPost(userId: string, body: CreatePostInputDTO): Promise<PostDTO>;
  deletePost(userId: string, postId: string): Promise<void>;
  getPost(userId: string, postId: string): Promise<PostDTO>;
  getUserById(userId: any): Promise<UserDTO | null>;
  getLatestPosts(userId: string, options: { limit?: number; before?: string; after?: string }): Promise<PostDTO[]>;
  getPostsByAuthor(userId: any, authorId: string, options: CursorPagination): Promise<PostDTO[]>;
  canSeePosts(followerId: string, followedId: string): Promise<Boolean>;
}
