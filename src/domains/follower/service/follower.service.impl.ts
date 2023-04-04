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
  async getFollower(followerId: any): Promise<FollowerDTO> {
    const follower = await this.repository.getById(followerId);
    if (!follower) throw new NotFoundException('follower');
    return follower;
  }
}
