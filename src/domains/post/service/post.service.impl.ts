import { CreatePostInputDTO, PostDTO } from '../dto';
import { PostRepository } from '../repository';
import { PostService } from '.';
import { validate } from 'class-validator';
import { ForbiddenException, NotFoundException } from '@utils';
import { CursorPagination } from '@types';
import { UserDTO } from '@domains/user/dto';

export class PostServiceImpl implements PostService {
  constructor(private readonly repository: PostRepository) {}

  createPost(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    validate(data);
    return this.repository.create(userId, data);
  }

  async deletePost(userId: string, postId: string): Promise<void> {
    const post = await this.repository.getById(postId, userId);
    if (!post) throw new NotFoundException('post');
    if (post.authorId !== userId) throw new ForbiddenException();
    return this.repository.delete(postId);
  }

  async getPost(userId: string, postId: string): Promise<PostDTO> {
    // TODO: validate that the author has public profile or the user follows the author
    const post = await this.repository.getById(postId, userId);
    if (!post) throw new NotFoundException('post');
    return post;
  }

  getLatestPosts(userId: string, options: CursorPagination): Promise<PostDTO[]> {
    // TODO: filter post search to return posts from authors that the user follows
    return this.repository.getAllByDatePaginated(userId, options);
  }

  getPostsByAuthor(userId: any, authorId: string, options: CursorPagination): Promise<PostDTO[]> {
    // TODO: throw exception when the author has a private profile and the user doesn't follow them
    return this.repository.getByAuthorId(userId, authorId, options);
  }
  getUserById(userId: any): Promise<UserDTO | null> {
    return this.repository.getUserById(userId);
  }
  canSeePosts(followerId: string, followedId: string): Promise<Boolean> {
    return this.repository.canSeePosts(followerId, followedId)
  }

}
