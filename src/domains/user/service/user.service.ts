import { CommentDTO } from '@domains/comment/dto';
import { PostDTO } from '@domains/post/dto';
import { ReactionDTO } from '@domains/reaction/dto';
import { OffsetPagination } from '@types';
import { UserDTO } from '../dto';

export interface UserService {
  deleteUser(userId: any): Promise<void>;
  getUser(userId: any): Promise<UserDTO>;
  getUserRecommendations(userId: any, options: OffsetPagination): Promise<UserDTO[]>;
  setPrivacySettings(userId: string, isPrivate: boolean): Promise<UserDTO> | null;
  tweetsLikedByUser(userId: string): Promise<ReactionDTO[] | null>;
  retweetsByUser(userId: string): Promise<ReactionDTO[] | null>;
  commentsByUser(userId: string): Promise<CommentDTO[] | null>;
}
