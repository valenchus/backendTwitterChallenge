import { UserDTO } from '@domains/user/dto';
import { PrismaClient } from '@prisma/client';

import { CursorPagination } from '@types';

import { PostRepository } from '.';
import { CreatePostInputDTO, PostDTO } from '../dto';

export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(userId: string, data: CreatePostInputDTO): Promise<PostDTO> {
    const post = await this.db.post.create({
      data: {
        authorId: userId,
        ...data,
      },
    });
    return new PostDTO(post);
  }

  async getAllByDatePaginated(userId: string, options: CursorPagination): Promise<PostDTO[]> {
    const posts = await this.db.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'asc',
        },
      ],
    });
    return posts.map(post => new PostDTO(post));
  }

  async delete(postId: string): Promise<void> {
    await this.db.post.delete({
      where: {
        id: postId,
      },
    });
  }

  async getById(postId: string, userId: string): Promise<PostDTO | null> {
    const post = await this.db.post.findUnique({
      where: {
        id: postId,
      },
      include: { author: true},
    });
    const user = await this.db.user.findUnique({
      where: {
        id: userId
      },
      include: {
        follows: true
      },
    });
    const isAuthorPublic = !post?.author?.isPrivate;
    const isUserFollowingAuthor = user?.follows.some((u) => u.followedId === post?.author?.id);
    if (!isAuthorPublic && !isUserFollowingAuthor) {
      return null;
    }
    return post ? new PostDTO(post) : null;
  }
  async getByAuthorId(userId: string, authorId: string, options: CursorPagination): Promise<PostDTO[]> {
    const posts = await this.db.post.findMany({
      where: {
        authorId,
      },
      ...(options.after || options.before) && {
        cursor: {
          id: options.after ? options.after : options.before
        }
      },
      skip: options.after || options.before ? 1 : undefined,
      take: options.limit ? (options.before ? -options.limit : options.limit): undefined,
      orderBy: [
        {
          createdAt: 'desc'
        }
      ],
    });
    return posts.map(post => new PostDTO(post));
  }
  async getUserById(userId: any): Promise<UserDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      }
    });
    return user ? new UserDTO(user) : null;
  }
  
  async canSeePosts(followerId: string, followedId: string): Promise<boolean> {
    const user = await this.db.user.findUnique({
      where: {
        id: followedId,
      }
    })
    if (user?.isPrivate === false) {
      // El campo isPrivate es false
      return true;
    } else {
      const isBeingFollowed = await this.db.follow.findFirst({
        where: {
          followerId,
          followedId: user?.id
        }
      })
      if (isBeingFollowed) return true;
    }
    return false;
  }
  
}