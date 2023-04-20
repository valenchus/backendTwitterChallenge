import { SignupInputDTO } from '@domains/auth/dto';
import { OffsetPagination } from '@types';
import { FollowerDTO } from '../dto';

export interface FollowerRepository {
  follow(followerId: String, followedId: String): Promise<void>;
  unfollow(userId: string): Promise<void>;
  getById(followerId: string): Promise<FollowerDTO | null>;
  isFollowing(followerId: string, followedId: string): Promise<boolean>;
}
