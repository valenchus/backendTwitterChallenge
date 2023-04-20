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

  async getPost(userId: string, postId: string): Promise<PostDTO | null> {
    // TODO: validate that the author has public profile or the user follows the author
    const post = await this.repository.getById(postId, userId);
    if (!post) throw new NotFoundException('post');
    const userCanSee = await this.canSeePosts(userId, post.authorId);
    if (userCanSee) return post;
    return null;
  }

  async getLatestPosts(userId: string, options: CursorPagination, authorId?: string): Promise<PostDTO[] | null> {
    const posts = await this.repository.getAllByDatePaginated(userId, options);
    const filteredPosts = await Promise.all(
      posts.map(async (post) => {
        const canSeePost = await this.canSeePosts(userId, post.authorId);
        if (canSeePost) {
          return new PostDTO(post);
        }
        return null;
      })
    );
    if (authorId !== undefined) {
      return filteredPosts.filter((post) => post?.authorId === authorId) as PostDTO[];
    }
    return filteredPosts.filter((post) => post !== null) as PostDTO[];
  }

  async getPostsByAuthor(userId: any, authorId: string, options: CursorPagination): Promise<PostDTO[]> {
    // TODO: throw exception when the author has a private profile and the user doesn't follow them
    const canSeePost = await this.canSeePosts(userId, authorId);
    if (!canSeePost) throw new NotFoundException();
    return this.repository.getByAuthorId(userId, authorId, options);
  }
  getUserById(userId: any): Promise<UserDTO | null> {
    return this.repository.getUserById(userId);
  }
  canSeePosts(followerId: string, followedId: string): Promise<Boolean> {
    return this.repository.canSeePosts(followerId, followedId);
  }
}
