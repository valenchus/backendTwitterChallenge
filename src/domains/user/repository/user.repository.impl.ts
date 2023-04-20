import { SignupInputDTO } from '@domains/auth/dto';
import { CommentDTO } from '@domains/comment/dto';
import { PostDTO } from '@domains/post/dto';
import { ReactionDTO } from '@domains/reaction/dto';
import { PrismaClient } from '@prisma/client';
import { OffsetPagination } from '@types';
import { ExtendedUserDTO, UserDTO } from '../dto';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: SignupInputDTO): Promise<UserDTO> {
    const user = await this.db.user.create({
      data,
    });
    const generateUrl = `https://valenbucket7test.s3.amazonaws.com/s3-images/${user.id}.jpeg`;
    await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        imageProfile: generateUrl,
      },
    });
    return new UserDTO(user);
  }

  async tweetsLikedByUser(userId: string): Promise<ReactionDTO[] | null> {
    const tweets = await this.db.reaction.findMany({
      where: {
        userId: userId,
        type: 'like',
      },
    });
    return tweets.map((tweet) => new ReactionDTO(tweet));
  }
  async retweetsByUser(userId: string): Promise<ReactionDTO[] | null> {
    const tweets = await this.db.reaction.findMany({
      where: {
        userId: userId,
        type: 'retweet',
      },
    });
    // return tweets ? tweets.map((tweet) => new ReactionDTO(tweet)) : null;
    return tweets.map((tweet) => new ReactionDTO(tweet));
  }
  async commentsByUser(userId: string): Promise<CommentDTO[] | null> {
    const comments = await this.db.comment.findMany({
      where: {
        userId: userId,
      },
    });
    return comments ? comments.map((comment) => new CommentDTO(comment)) : null;
  }

  async getById(userId: any): Promise<UserDTO | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user ? new UserDTO(user) : null;
  }

  async delete(userId: any): Promise<void> {
    await this.db.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async getRecommendedUsersPaginated(options: OffsetPagination): Promise<UserDTO[]> {
    const users = await this.db.user.findMany({
      take: options.limit,
      skip: options.skip,
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
    return users.map((user) => new UserDTO(user));
  }

  async getByEmailOrUsername(email?: string, username?: string): Promise<ExtendedUserDTO | null> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });
    return user ? new ExtendedUserDTO(user) : null;
  }
  async updateUser(userId: string, data: any): Promise<UserDTO> {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return new UserDTO(user);
  }
  async setPrivacySettings(userId: string, isPrivate: boolean): Promise<UserDTO> {
    const user = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        isPrivate: isPrivate,
      },
    });
    return new UserDTO(user);
  }
}
