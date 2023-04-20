import { NotFoundException } from '@utils/errors';
import { OffsetPagination } from 'types';
import { FollowerDTO } from '../dto';
import { FollowerRepository } from '../repository';
import { FollowerService } from './follower.service';

export class FollowerServiceImpl implements FollowerService {
  constructor(private readonly repository: FollowerRepository) {}

  async followUser(followerId: string, followedId: string): Promise<void> {
      await this.repository.follow(followerId, followedId)
  }
  async unFollowUser(userId: string): Promise<void> {
      await this.repository.unfollow(userId)
  }
  async getFollower(followerId: string, followedId: string): Promise<boolean> {
    const following = await this.repository.isFollowing(followerId, followedId);
    return following ;
  }
}
