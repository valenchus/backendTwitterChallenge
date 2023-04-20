import { OffsetPagination } from '@types';
import { FollowerDTO } from '../dto/index';

export interface FollowerService {
  followUser(followerId: String, followedId: String): Promise<void>;
  unFollowUser(followerId: String, followedId: String): Promise<void>;
  getFollower(followerId: string, followedId: string): Promise<boolean>;

}