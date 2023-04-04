import { OffsetPagination } from '@types';
import { FollowerDTO } from '../dto/index';

export interface FollowerService {
//   deleteUser(userId: any): Promise<void>;
  followUser(followerId: String, followedId: String): Promise<void>;
  unFollowUser(followerId: String, followedId: String): Promise<void>;
}