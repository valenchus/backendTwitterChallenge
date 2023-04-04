import { PrismaClient } from '@prisma/client';
import { FollowerDTO } from '../dto';
import { FollowerRepository } from './follower.repository';

export class FollowerRepositoryImpl implements FollowerRepository {
  constructor(private readonly db: PrismaClient) {}

  async follow(followerId: string, followedId: string): Promise<void> {
     
    const user = await this.db.user.findMany(); // -> users not showing at pgadmin anymore
    await this.db.follow.create({
      data: {
        followerId,
        followedId
      },
    });
  }
  async unfollow(followedId: any): Promise<void> {
        
    await this.db.follow.delete({
      where: {
        id: followedId,
      },
    });
  }
  async getById(followerId: string): Promise<FollowerDTO | null> {
    const follower = await this.db.follow.findUnique({
      where: {
        id: followerId,
      },
    });
    return follower ? new FollowerDTO(follower) : null
  }

}
