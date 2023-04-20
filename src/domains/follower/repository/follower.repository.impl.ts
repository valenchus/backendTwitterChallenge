import { PrismaClient } from '@prisma/client';
import { FollowerDTO } from '../dto';
import { FollowerRepository } from './follower.repository';

export class FollowerRepositoryImpl implements FollowerRepository {
  constructor(private readonly db: PrismaClient) {}

  async follow(followerId: string, followedId: string): Promise<void> {
    const user = await this.db.user.findMany();
    await this.db.follow.create({
      data: {
        followerId,
        followedId,
      },
    });
  }
  async unfollow(userId: string): Promise<void> {
    const followConnection = await this.db.follow.findFirst({
      where: {
        followerId: userId,
      },
    });
    if (!followConnection) {
      return;
    }
    await this.db.follow.delete({
      where: {
        id: followConnection.id,
      },
    });
  }

  async getById(followerId: string): Promise<FollowerDTO | null> {
    const follower = await this.db.follow.findUnique({
      where: {
        id: followerId,
      },
    });
    return follower ? new FollowerDTO(follower) : null;
  }

  async isFollowing(followerId: string, followedId: string): Promise<boolean> {
    const follows = await this.db.follow.findMany({
      where: {
        followerId,
      },
    });
    return follows.some((follow) => follow.followedId === followedId);
  }
}
